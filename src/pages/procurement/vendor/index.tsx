import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { vendorColumns } from './config/columns';
import { IItemTableData, IVendorTableData } from './config/columns/columns.type';
import { useVendor } from './config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const Details = lazy(() => import('./details'));

const Vendor = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useVendor<IVendorTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Procurement/Vendor', url, 'procurement__vendor'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IVendorTableData | null>(null);
	const handleUpdate = (row: Row<IVendorTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};
	const [itemUuid, setItemUuid] = useState<string | null>(null);
	const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
	const handleDetails = (row: Row<IItemTableData>) => {
		setItemUuid(row.original.uuid);
		setIsOpenDetailsModal(true);
	};
	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IVendorTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Table Columns
	const columns = vendorColumns(handleDetails);

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
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
					<Details
						{...{
							itemUuid: itemUuid ?? '',
							setItemUuid,
							open: isOpenDetailsModal,
							setOpen: setIsOpenDetailsModal,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Vendor;
