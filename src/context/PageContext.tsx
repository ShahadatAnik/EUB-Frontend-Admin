import { createContext, useEffect, useMemo } from 'react';
import useAccess from '@/hooks/useAccess';

interface IPageContext {
	pageName: string;
	readAccess: boolean;
	createAccess: boolean;
	updateAccess: boolean;
	deleteAccess: boolean;
}

export const PageContext = createContext({} as IPageContext);

interface IPageProviderProps {
	pageName: string;
	pageTitle: string;
	children: React.ReactNode;
}

const PageProvider: React.FC<IPageProviderProps> = ({ children, pageName, pageTitle }) => {
	const pageAccess = useAccess(pageName) as string[];
	const readAccess = pageAccess.includes('read');
	const createAccess = pageAccess.includes('create');
	const updateAccess = pageAccess.includes('update');
	const deleteAccess = pageAccess.includes('delete');

	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);

	const value = useMemo(
		(): IPageContext => ({
			pageName,
			readAccess,
			createAccess,
			updateAccess,
			deleteAccess,
		}),
		[pageName, readAccess, createAccess, updateAccess, deleteAccess]
	);
	return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageProvider;
