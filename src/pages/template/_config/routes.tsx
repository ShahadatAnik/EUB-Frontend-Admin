import { lazy } from 'react';
import { IRoute } from '@/types';

const BasicAddUpdate = lazy(() => import('@/pages/template/basic-add-update'));
const MultiModal = lazy(() => import('@/pages/template/multi-modal'));
const Entry = lazy(() => import('@/pages/template/entry-with-details'));
const EntryAddOrUpdate = lazy(() => import('@/pages/template/entry-with-details/add-or-update'));
const EntryDetails = lazy(() => import('@/pages/template/entry-with-details/details'));

const TemplateRoutes: IRoute[] = [
	{
		name: 'Template',
		children: [
			{
				name: 'Basic Add Update',
				path: '/template/basic-add-update',
				element: <BasicAddUpdate />,
				page_name: 'template__basic_add_update',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Multi Modal',
				path: '/template/multi-modal',
				element: <MultiModal />,
				page_name: 'template__multi_modal',
				actions: ['read', 'create', 'update', 'delete', 'click_action', 'click_trx_against_order'],
			},
			{
				name: 'Entry With Details',
				path: '/template/entry-with-details',
				element: <Entry />,
				actions: ['read', 'create', 'update', 'delete'],
				page_name: 'template__entry',
				disableCollapse: true,
				children: [
					{
						name: 'Add',
						path: '/template/entry-with-details/add',
						element: <EntryAddOrUpdate />,
						page_name: 'template__entry_add',
						actions: ['read'],
						hidden: true,
					},
					{
						name: 'Update',
						path: '/template/entry-with-details/:id/update',
						element: <EntryAddOrUpdate />,
						page_name: 'template__entry_update',
						actions: ['read'],
						hidden: true,
					},
					{
						name: 'Details',
						path: '/template/entry-with-details/:id',
						element: <EntryDetails />,
						page_name: 'template__entry_details',
						actions: ['read'],
						hidden: true,
					},
				],
			},
		],
	},
];

export default TemplateRoutes;
