import { ColumnDef, Row } from '@tanstack/react-table';

import HoverCardWrapper from '@/components/others/hover-card-wrapper';
import { Switch } from '@/components/ui/switch';

import { cn } from '@/lib/utils';

import { IContactUSTableData, IVisitorTableData } from './columns.type';

// * Inquiry
export const visitorColumns = (): ColumnDef<IVisitorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: true,
		cell: (info) => (
			<span
				className={cn(`rounded-full px-3 py-2 capitalize`, {
					'bg-yellow-400': info?.getValue() === 'pending',
					'bg-red-400': info?.getValue() === 'rejected',
					'bg-green-400': info?.getValue() === 'converted',
				})}
			>
				{info?.getValue() as string}
			</span>
		),
	},
	{
		accessorKey: 'mobile',
		header: 'Mobile',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: true,
		cell: (info) =>
			(info?.getValue() as string)
				.split('_') // Split by underscores
				.map(
					(word: string, index: number) =>
						index === 0
							? word.charAt(0).toUpperCase() + word.slice(1) // Capitalize first word
							: word // Keep other words as is
				)
				.join(' '), // Join with space
	},

	// Call entry
	{
		accessorKey: 'subject_preference',
		header: 'Subject',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'from_where',
		header: 'From Where',
		enableColumnFilter: true,
	},

	// FAQ
	{
		accessorKey: 'prev_institution',
		header: 'Prev Institution',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'through',
		header: 'Through',
		enableColumnFilter: true,
	},
];
export const contactUSColumns = (
	handleResponse: (row: Row<IContactUSTableData>) => void
): ColumnDef<IContactUSTableData>[] => [
	{
		accessorKey: 'is_response',
		header: 'Respond',
		enableColumnFilter: true,
		cell: (info) => (
			<Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleResponse(info.row)} />
		),
	},
	{
		accessorKey: 'full_name',
		header: 'Name',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'phone',
		header: 'phone',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'question',
		header: 'Question',
		enableColumnFilter: true,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: true,
		cell: (info) => <HoverCardWrapper title={info.getValue<string>()} content={info.getValue<string>()} />,
	},
];
