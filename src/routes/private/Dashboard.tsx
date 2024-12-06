// Pages
// const Dashboard = lazy(() => import('@pages/Dashboard'));
// import Dashboard from '@pages/Dashboard';
import { IRoute } from '@/types';

export const DashboardRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		element: <>Dashboard</>,
		page_name: 'dashboard',
		actions: ['read'],
	},
];
