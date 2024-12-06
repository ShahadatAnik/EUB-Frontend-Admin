import { lazy } from 'react';
import { IRoute } from '@/types';

const NewsPortal = lazy(() => import('@/pages/news-portal/default'));
const NewsPortalAddOrUpdate = lazy(() => import('@/pages/news-portal/default/add-or-update'));

const NewsPortalRoutes: IRoute[] = [
	{
		path: '/news-portal',
		name: 'News Portal',
		element: <NewsPortal />,
		page_name: 'news__portal',
		actions: ['read', 'create', 'update', 'delete'],
		disableCollapse: true,
		children: [
			{
				name: 'Add',
				path: '/news-portal/add',
				element: <NewsPortalAddOrUpdate />,
				page_name: 'news__portal_add',
				actions: ['create', 'read', 'update'],
				hidden: true,
			},
			{
				name: 'Update',
				path: '/news-portal/:id/update',
				element: <NewsPortalAddOrUpdate />,
				page_name: 'news__portal_update',
				actions: ['create', 'read', 'update'],
				hidden: true,
			},
			// {
			// 	name: 'Details',
			// 	path: '/template/entry-with-details/:id',
			// 	element: <EntryDetails />,
			// 	page_name: 'template__entry_details',
			// 	actions: ['create', 'read', 'update'],
			// 	hidden: true,
			// },
		],
	},
];

export default NewsPortalRoutes;
