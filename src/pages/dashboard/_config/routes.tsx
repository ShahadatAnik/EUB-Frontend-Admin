import { lazy } from 'react';
import { IRoute } from '@/types';

const Dashboard = lazy(() => import('@/pages/dashboard'));

const DashboardRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		element: <Dashboard />,
		page_name: 'dashboard',
		actions: ['read'],
	},
];

export default DashboardRoutes;
