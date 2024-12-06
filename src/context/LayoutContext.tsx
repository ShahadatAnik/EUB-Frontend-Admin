import { createContext, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface ILayoutContext {
	isCollapsed: boolean;
	setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = createContext({} as ILayoutContext);

interface ILayoutProps {
	children: React.ReactNode;
}

const LayoutProvider: React.FC<ILayoutProps> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathName = useLocation().pathname;

	useHotkeys('ctrl+q', () => {
		setIsCollapsed(!isCollapsed);
	});

	const value = useMemo((): ILayoutContext => {
		return {
			isCollapsed,
			setIsCollapsed,
			sidebarOpen,
			setSidebarOpen,
		};
	}, [isCollapsed, sidebarOpen]);

	// Get the authentication state from the context
	const { signed, loading } = useAuth();

	// Render a loading indicator while authentication is in progress
	if (loading) {
		return <span className='loading loading-dots loading-lg z-50' />;
	}

	// If the user is not signed in, redirect to the login page
	if (!signed) {
		return <Navigate to={`/login?redirect=${pathName}`} replace={true} />;
	}

	return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export default LayoutProvider;
