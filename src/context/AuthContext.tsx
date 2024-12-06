import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { IAuthResponse, IUser } from '@/types';
import { toast } from 'sonner';
import useCookie from '@/hooks/useCookie';
import { useLocalStorage } from '@/hooks/useStorage';

import { ILoginData } from '@/components/auth/login/schema';

import { api } from '@/lib/api';

// Define the AuthContext interface with state and functions
interface IAuthContext {
	signed: boolean;
	user: IUser | null;
	canAccess: { [key: string]: string } | null;
	loading: boolean;
	login: (data: ILoginData) => Promise<void>;
	logout: () => void;
}

// Create the AuthContext with an initial empty value
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

// Define the AuthProvider component props
interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// State variables for redirectUrl, user, access, and loading state
	const [redirectUrl, setRedirectUrl] = useState('/');
	const [user, setUser] = useState<IUser | null>(null);
	const [canAccess, setCanAccess] = useState<{
		[key: string]: string;
	} | null>(null);
	const [loading, setLoading] = useState(true);

	// Access to cookie values and functions
	const { value: authCookie, updateCookie: updateAuthCookie, deleteCookie: deleteAuthCookie } = useCookie('auth');
	const { value: userCookie, updateCookie: updateUserCookie, deleteCookie: deleteUserCookie } = useCookie('user');
	const [userCanAccess, updateUserCanAccess, removeUserCanAccess] = useLocalStorage('can_access', '');

	useEffect(() => {
		if (!user) {
			setRedirectUrl(new URLSearchParams(window.location.search).get('redirect') || '/');
		} else {
			setRedirectUrl('/');
		}
	}, [redirectUrl, user]);

	// Effect hook to load data from cookies on mount
	useEffect(() => {
		const loadCookieData = async () => {
			if (authCookie && userCookie) {
				setUser(JSON.parse(userCookie as string));
				setCanAccess(JSON.parse(userCanAccess));
			}
			setLoading(false);
		};

		loadCookieData();
	}, [authCookie, userCookie, userCanAccess]);

	// Login function with error handling and toast notifications
	const login = useCallback(
		async (data: ILoginData) => {
			try {
				const response = await api.post<IAuthResponse>('/hr/user/login', data);
				const { token, user, can_access } = response.data;

				updateAuthCookie(`Bearer ${token || ''}`);
				updateUserCanAccess(can_access || '');
				updateUserCookie(JSON.stringify(user) || '');
				setUser(user);
				setCanAccess(can_access);

				if (token && user) {
					toast.success('Logged in successfully');

					window.location.href = redirectUrl;
					return;
				}

				// ShowToast({
				// 	type: response?.data?.type,
				// 	message: response?.data?.message,
				// });
				toast.error(response?.data?.message);
			} catch (error: any) {
				// ShowToast(error.response);
				toast.error(error?.response?.data?.message);
			}
		},
		[updateAuthCookie, updateUserCanAccess, updateUserCookie, redirectUrl]
	);

	// Logout function that clears cookies and state
	const logout = useCallback(() => {
		deleteAuthCookie();
		deleteUserCookie();
		removeUserCanAccess();
		setUser(null);
	}, [deleteAuthCookie, deleteUserCookie, removeUserCanAccess]);

	// Memoized value for the AuthContext with derived state properties
	const value = useMemo<IAuthContext>(
		() => ({
			signed: !!user,
			user,
			canAccess,
			loading,
			login,
			logout,
		}),
		[user, canAccess, loading, login, logout]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
