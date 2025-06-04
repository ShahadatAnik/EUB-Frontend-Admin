import { lazy } from 'react';
import { IRoute } from '@/types';

const Category = lazy(() => import('@/pages/procurement/category'));
const SubCategory = lazy(() => import('@/pages/procurement/subcategory'));
const PurchaseCostCenter = lazy(() => import('@/pages/procurement/purchaseCostCenter'));
const Item = lazy(() => import('@/pages/procurement/item'));
const ItemEntry = lazy(() => import('@/pages/procurement/item/entry'));
const Process = lazy(() => import('@/pages/procurement/process'));
const Vendor = lazy(() => import('@/pages/procurement/vendor'));
// const ItemWorkOrder = lazy(() => import('@/pages/procurement/item-work-order'));
// const ItemWorkOrderEntry = lazy(() => import('@/pages/procurement/item-work-order/entry'));
// const ItemWorkOrderDetails = lazy(() => import('@/pages/procurement/item-work-order/details'));
const PDFStatic = lazy(() => import('@/pages/procurement/form'));
const ProcureCapital = lazy(() => import('@/pages/procurement/procure'));
const ProcureCapitalEntry = lazy(() => import('@/pages/procurement/procure/entry'));
const ProcureCapitalDetails = lazy(() => import('@/pages/procurement/procure/details'));
const Service = lazy(() => import('@/pages/procurement/service'));
const ServiceEntry = lazy(() => import('@/pages/procurement/service/entry'));
const ServiceDetails = lazy(() => import('@/pages/procurement/service/details'));
const InternalCostCenter = lazy(() => import('@/pages/procurement/internal-cost-center'));
const Requisition = lazy(() => import('@/pages/procurement/requisition'));
const RequisitionEntry = lazy(() => import('@/pages/procurement/requisition/entry'));
const RequisitionProvided = lazy(() => import('@/pages/procurement/requisition/provided'));
const Log = lazy(() => import('@/pages/procurement/log'));
const ReportItem = lazy(() => import('@/pages/procurement/report/item/index'));
const GeneralStatement = lazy(() => import('@/pages/procurement/pdf-make/index'));
const WorkOrder = lazy(() => import('@/pages/procurement/pdf-make/work-order'));
const ItemRequisitionFormCapital = lazy(() => import('@/pages/procurement/pdf-make/item-requistion-capital'));
const ComparativeStatement = lazy(() => import('@/pages/procurement/pdf-make/comparitive-statement'));
const SubPurchaseCostCenter = lazy(() => import('@/pages/procurement/sub-purchase-cost-center'));

const procurementRoutes: IRoute[] = [
	{
		name: 'Procurement',
		children: [
			// ? Capital
			{
				name: 'Report',
				children: [
					{
						name: 'Item',
						path: '/portfolio/report/item',
						element: <ReportItem />,
						page_name: 'portfolio__report_item',
						actions: ['read'],
					},
				],
			},
			{
				name: 'Procure (Capital)',
				path: '/procurement/procure-capital',
				element: <ProcureCapital />,
				page_name: 'procurement__procure_capital',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Procure Entry (Capital)',
				path: '/procurement/procure-capital/create',
				element: <ProcureCapitalEntry />,
				hidden: true,
				page_name: 'procurement__procure_capital_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Procure Update (Capital)',
				path: '/procurement/procure-capital/:uuid/update',
				element: <ProcureCapitalEntry />,
				hidden: true,
				page_name: 'procurement__procure_capital_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Procure Details (Capital)',
				path: '/procurement/procure-capital-details/:uuid',
				element: <ProcureCapitalDetails />,
				hidden: true,
				page_name: 'procurement__procure_capital_details',
				actions: ['read'],
			},

			// ? Service
			{
				name: 'Service',
				path: '/procurement/service',
				element: <Service />,
				page_name: 'procurement__service',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Service Entry',
				path: '/procurement/service/create',
				element: <ServiceEntry />,
				hidden: true,
				page_name: 'procurement__service_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Service Update',
				path: '/procurement/service/:uuid/update',
				element: <ServiceEntry />,
				hidden: true,
				page_name: 'procurement__service_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Service Details',
				path: '/procurement/service-details/:uuid',
				element: <ServiceDetails />,
				hidden: true,
				page_name: 'procurement__service_details',
				actions: ['read'],
			},

			// ? Item Work Order
			// {
			// 	name: 'Item Work Order',
			// 	path: '/procurement/item-work-order',
			// 	element: <ItemWorkOrder />,
			// 	page_name: 'procurement__item_work_order',
			// 	actions: ['create', 'read', 'update', 'delete'],
			// },
			// {
			// 	name: 'Item Work Order Entry',
			// 	path: '/procurement/item-work-order/create',
			// 	element: <ItemWorkOrderEntry />,
			// 	hidden: true,
			// 	page_name: 'procurement__item_work_order_entry',
			// 	actions: ['create', 'read', 'update', 'delete'],
			// },
			// {
			// 	name: 'Item Work Order Update',
			// 	path: '/procurement/item-work-order/:uuid/update',
			// 	element: <ItemWorkOrderEntry />,
			// 	hidden: true,
			// 	page_name: 'procurement__item_work_order_update',
			// 	actions: ['create', 'read', 'update', 'delete'],
			// },
			// {
			// 	name: 'Item Work Order Details',
			// 	path: '/procurement/item-work-order-details/:uuid',
			// 	element: <ItemWorkOrderDetails />,
			// 	hidden: true,
			// 	page_name: 'procurement__item_work_order_details',
			// 	actions: ['read'],
			// },

			// ? Item Work Order Details
			{
				name: 'Item',
				path: '/procurement/item',
				element: <Item />,
				page_name: 'procurement__item',
				actions: ['create', 'read', 'update', 'delete', 'click_item_trx'],
			},
			{
				name: 'Item Entry',
				path: '/procurement/item/create',
				element: <ItemEntry />,
				hidden: true,
				page_name: 'procurement__item_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item Update',
				path: '/procurement/item/:uuid/update',
				element: <ItemEntry />,
				hidden: true,
				page_name: 'procurement__item_update',
				actions: ['create', 'read', 'update', 'delete'],
			},

			{
				name: 'Requisition',
				path: '/procurement/requisition',
				element: <Requisition />,
				page_name: 'procurement__requisition',
				actions: [
					'create',
					'read',
					'update',
					'delete',
					'click_provided',
					'show_all',
					'click_received',
					'click_received_override',
					'click_store_received_override',
					'click_store_received',
				],
			},
			{
				name: 'Requisition Entry',
				path: '/procurement/requisition/create',
				element: <RequisitionEntry />,
				hidden: true,
				page_name: 'procurement__requisition_entry',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Requisition Provided',
				path: '/procurement/requisition/:uuid/provided',
				element: <RequisitionProvided />,
				hidden: true,
				page_name: 'procurement__requisition_provided',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Requisition Update',
				path: '/procurement/requisition/:uuid/update',
				element: <RequisitionEntry />,
				hidden: true,
				page_name: 'procurement__requisition_update',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'PDF (Static)',
				path: '/procurement/pdf-static',
				element: <PDFStatic />,
				page_name: 'procurement__pdf_static',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'PDF (Generate)',
				path: '/procurement/pdf/generate',
				element: <GeneralStatement />,
				page_name: 'procurement__pdf_generate',
				actions: ['read'],
			},
			{
				name: 'Work-Order-Form',
				path: '/procurement/pdf/generate/work-order-form',
				element: <WorkOrder />,
				hidden: true,
				page_name: 'procurement__pdf_form_work_order_form',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Item-Requisition-Form (Capital)',
				path: '/procurement/pdf/generate/item-requisition-form-capital',
				element: <ItemRequisitionFormCapital />,
				hidden: true,
				page_name: 'procurement__pdf_form_item_requisition_form_capital',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Comparative Statement',
				path: '/procurement/pdf/generate/comparative-statement',
				element: <ComparativeStatement />,
				hidden: true,
				page_name: 'procurement__pdf_form_comparative_statement',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Log',
				path: '/procurement/log',
				element: <Log />,
				page_name: 'procurement__log',
				actions: ['read', 'update', 'delete'],
			},

			{
				name: 'Library',
				children: [
					{
						name: 'Cost Center',
						path: '/procurement/cost-center',
						element: <InternalCostCenter />,
						page_name: 'procurement__cost_center',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Vendor',
						path: '/procurement/vendor',
						element: <Vendor />,
						page_name: 'procurement__vendor',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Sub-Category',
						path: '/procurement/sub-category',
						element: <SubPurchaseCostCenter />,
						page_name: 'procurement__sub_category',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Category',
						path: '/procurement/category',
						element: <PurchaseCostCenter />,
						page_name: 'procurement__category',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Sub-Segment',
						path: '/procurement/sub-segment',
						element: <SubCategory />,
						page_name: 'procurement__sub_segment',
						actions: ['create', 'read', 'update', 'delete'],
					},
					{
						name: 'Segment',
						path: '/procurement/segment',
						element: <Category />,
						page_name: 'procurement__segment',
						actions: ['create', 'read', 'update', 'delete'],
					},

					{
						name: 'Process',
						path: '/procurement/process',
						element: <Process />,
						page_name: 'procurement__process',
						actions: [
							'read',
							'delete',
							'click_items',
							'click_service',
							'click_range_1',
							'click_range_2',
							'click_range_3',
							'click_range_4',
						],
					},
				],
			},
		],
	},
];
export default procurementRoutes;
