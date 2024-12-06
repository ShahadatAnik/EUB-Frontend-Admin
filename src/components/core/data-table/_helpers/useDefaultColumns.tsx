import { ColumnDef } from '@tanstack/react-table';
import usePage from '@/hooks/usePage';

import HoverCardWrapper from '@/components/others/hover-card-wrapper';
import DateTime from '@/components/ui/date-time';

import TableCellAction from '../_components/cell-action';

const useDefaultColumns = <TData, TValue>(): ColumnDef<TData, TValue>[] => {
	const { deleteAccess, updateAccess } = usePage();

	const columns: ColumnDef<TData, TValue>[] = [
		{
			accessorKey: 'remarks',
			header: 'Remarks',
			cell: (info) => <HoverCardWrapper title={info.getValue<string>()} content={info.getValue<string>()} />,
		},
		{
			accessorKey: 'created_by_name',
			header: 'Created By',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'created_at',
			header: 'Created At',
			enablePinning: false,
			cell: (info) => <DateTime date={info.getValue() as Date} />,
			filterFn: 'dateRange',
			meta: {
				filterVariant: 'dateRange',
			},
		},
		{
			accessorKey: 'updated_at',
			header: 'Updated At',
			enablePinning: false,
			cell: (info) => <DateTime date={info.getValue() as Date} />,
			meta: {
				filterVariant: 'dateRange',
			},
		},

		{
			id: 'actions',
			accessorKey: 'actions',
			header: () => <p className='text-center'>Actions</p>,
			enableColumnFilter: false,
			enableSorting: false,
			enableHiding: false,
			cell: (info) => <TableCellAction info={info} />,
			size: 60,
			meta: {
				hidden: !updateAccess && !deleteAccess,
				disableFullFilter: true,
			},
		},
	];

	return columns;
};

export default useDefaultColumns;
