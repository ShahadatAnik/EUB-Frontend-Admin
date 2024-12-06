import { ColumnDef } from '@tanstack/react-table';

import { INewsPortalTableData } from './columns.type';

export const newsPortalColumns = (): ColumnDef<INewsPortalTableData>[] => [
	{
		accessorKey: 'cover_image',
		header: 'Cover Image',
	},
	{
		accessorKey: 'title',
		header: 'Title',
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'published_date',
		header: 'Published on',
	},
];
