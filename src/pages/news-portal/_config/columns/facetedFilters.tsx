import { ITableFacetedFilter } from '@/types';

export const type1FacetedFilters: ITableFacetedFilter[] = [
	{
		id: 'status',
		title: 'Status',
		options: [
			{
				label: 'Success',
				value: 'success',
			},
			{
				label: 'Failed',
				value: 'failed',
			},
		],
	},
];
