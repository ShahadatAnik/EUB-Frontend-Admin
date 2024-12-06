import { createContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ISidebarContext {
	path: ReturnType<typeof useLocation>;
	isCloseAll: boolean;
	setIsCloseAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext({} as ISidebarContext);

interface ISidebarProviderProps {
	children: React.ReactNode;
}

const SidebarProvider: React.FC<ISidebarProviderProps> = ({ children }) => {
	const [isCloseAll, setIsCloseAll] = useState(false);
	const path = useLocation();

	const value = useMemo((): ISidebarContext => {
		return {
			path,
			isCloseAll,
			setIsCloseAll,
		};
	}, [path, isCloseAll]);

	return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
