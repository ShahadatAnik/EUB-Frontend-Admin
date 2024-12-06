import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { getRandomPreviousDate, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { test3Columns } from '../_config/columns'; // TODO: Import columns

import { IPaymentTableData } from '../_config/columns/columns.type';
import { type1FacetedFilters } from '../_config/columns/facetedFilters'; // TODO: Import faceted filters (Optional)
import { useTest } from '../_config/query'; // TODO: Import query

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

//TODO: Remove it when working with real data
const fakePayments: IPaymentTableData[] = Array.from({ length: 10 }, (_, i) => ({
	amount: 100 + i,
	email: `a${i}@a.com`,
	id: `${i + 1}`,
	status: 'success',
	created_at: getRandomPreviousDate(30),
}));

// TODO: Update Component Name
const EntryWithDetails = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useTest<IPaymentTableData[]>(); // TODO: Update query

	// TODO: Update Page Info (Title, Url and Tab Name)
	const pageInfo = useMemo(() => new PageInfo('Entry With Details', url, 'template__entry'), [url]);

	const handleCreate = () => navigate('/template/entry-with-details/add'); // TODO: Update route

	const handleUpdate = (row: Row<IPaymentTableData>) => {
		navigate(`/template/entry-with-details/${row.original.id}/update`); // TODO: Update route
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

	// Table Columns
	const columns = test3Columns(); // TODO: Update columns

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
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default EntryWithDetails;
