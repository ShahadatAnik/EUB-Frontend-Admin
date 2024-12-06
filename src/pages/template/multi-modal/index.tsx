import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { getRandomPreviousDate, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { test2Columns } from '../_config/columns'; // TODO: Import columns

// TODO: Import columns type
import { IActionTrx, IActionTrxAgainstOrder, IPaymentTableData } from '../_config/columns/columns.type';
import { type1FacetedFilters } from '../_config/columns/facetedFilters'; // TODO: Import faceted filters (Optional)
import { useTest } from '../_config/query'; // TODO: Import query

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));
const AgainstTrx = lazy(() => import('./against-trx'));
const AgainstOrderTransfer = lazy(() => import('./against-order-transfer'));

//TODO: Remove it when working with real data
const fakePayments: IPaymentTableData[] = Array.from({ length: 10 }, (_, i) => ({
	amount: 100 + i,
	email: `a${i}@a.com`,
	id: `${i + 1}`,
	status: 'success',
	created_at: getRandomPreviousDate(30),
}));

// TODO: Update Component Name
const MultiModal = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useTest<IPaymentTableData[]>(); // TODO: Update query

	// TODO: Update Page Info (Title, Url and Tab Name)
	const pageInfo = useMemo(() => new PageInfo('Multi Modal', url, 'template__multi_modal'), [url]);

	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionTrxAccess = pageAccess.includes('click_action'); // TODO: Update Action Trx Access
	const actionTrxAgainstOrderAccess = pageAccess.includes(
		'click_trx_against_order' // TODO: Update Action Trx Against Order Access
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IPaymentTableData | null>(null); // TODO: Update updatedData type
	const handleUpdate = (row: Row<IPaymentTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IPaymentTableData>) => {
		setDeleteItem({
			id: row?.original?.id, // TODO: Update Delete Item ID
			name: row?.original?.email, // TODO: Update Delete Item Name
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IPaymentTableData>[]) => {
		// TODO: Update Row type
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.id,
				name: row.email,
				checked: true,
			})) // TODO: Update Delete Item ID & Name
		);
	};

	// Action Trx Modal state
	const [isOpenActionTrxModal, setIsOpenActionTrxModal] = useState(false);
	const [updateActionTrxData, setUpdateActionTrxData] = useState<IActionTrx | null>(null);

	const handleAgainstTrx = (row: Row<IPaymentTableData>) => {
		// TODO: Update Action Trx Data type
		setUpdateActionTrxData({
			uuid: row.original.id,
			name: row.original.email,
			stock: row.original.amount,
		});
		setIsOpenActionTrxModal(true);
	};

	// Action Against Order Modal state
	const [isOpenActionAgainstOrderModal, setIsOpenActionAgainstOrderModal] = useState(false);
	const [updateActionAgainstOrderData, setUpdateActionAgainstOrderData] = useState<IActionTrxAgainstOrder | null>(
		null
	);

	const handleAgainstOrder = (row: Row<IPaymentTableData>) => {
		// TODO: Update Action Against Order Data type
		setUpdateActionAgainstOrderData({
			uuid: row.original.id,
			name: row.original.email,
			stock: row.original.amount,
		});
		setIsOpenActionAgainstOrderModal(true);
	};

	// Table Columns
	const columns = test2Columns({
		actionTrxAccess,
		actionTrxAgainstOrderAccess,
		handleAgainstTrx,
		handleAgainstOrder,
	}); // TODO: Update columns

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? fakePayments} // TODO: Replace fakePayments with []
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				handleDeleteAll={handleDeleteAll}
				// TODO: Update facetedFilters (OPTIONAL)
				facetedFilters={type1FacetedFilters}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
					<DeleteAllModal
						{...{
							deleteItems,
							setDeleteItems,
							url,
							deleteData,
						}}
					/>,

					<AgainstTrx
						{...{
							open: isOpenActionTrxModal,
							setOpen: setIsOpenActionTrxModal,
							updatedData: updateActionTrxData,
							setUpdatedData: setUpdateActionTrxData,
							postData,
							url: '/material/trx', // TODO: Update URL
						}}
					/>,
					<AgainstOrderTransfer
						{...{
							open: isOpenActionAgainstOrderModal,
							setOpen: setIsOpenActionAgainstOrderModal,
							updatedData: updateActionAgainstOrderData,
							setUpdatedData: setUpdateActionAgainstOrderData,
							postData,
							url: '/zipper/material-trx-against-order', // TODO: Update URL
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default MultiModal;
