import { useMemo } from 'react';

import DebouncedInput from '@/components/ui/debounce-input';

import { IFilterProps } from '../../../types';

function StringFilter<TData, TValue>({ column, showLabel }: IFilterProps<TData, TValue>) {
	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(() => Array.from(column.getFacetedUniqueValues().keys()).sort(), [column]);

	return (
		<div className='flex flex-col gap-1'>
			{showLabel && (
				<label className='text-sm font-medium capitalize'>
					{typeof column.columnDef.header === 'string'
						? column.columnDef.header
						: column.id?.split('_').join(' ')}
				</label>
			)}
			<datalist id={column.id + 'list'}>
				{sortedUniqueValues.slice(0, 10).map((value, index) => (
					<option key={value !== null && value !== undefined ? value : `option-${index}`} value={value} />
				))}
			</datalist>
			<DebouncedInput
				className='w-full rounded border'
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search...`}
				type='text'
				list={column.id + 'list'}
				value={(columnFilterValue ?? '') as string}
			/>
		</div>
	);
}

export default StringFilter;
