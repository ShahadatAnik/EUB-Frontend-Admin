import Login from '@/pages/public/login';
import NotFound from '@/pages/public/not-found';

const publicRoutes = [
	{
		path: '/login',
		element: <Login />,
	},
	// {
	// 	path: '/no-access',
	// 	element: <NoAccess />,
	// },
	{
		path: '/not-found',
		element: <NotFound />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export default publicRoutes;
