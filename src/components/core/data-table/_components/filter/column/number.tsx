import { useMemo } from 'react';

import DebouncedInput from '@/components/ui/debounce-input';

import { IFilterProps } from '../../../types';

function NumberFilter<TData, TValue>({ column, showLabel }: IFilterProps<TData, TValue>) {
	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues: number[] = useMemo(
		() => Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column]
	);

	return (
		<div className='flex flex-col gap-1'>
			{showLabel && (
				<label className='text-sm font-medium capitalize'>
					{typeof column.columnDef.header === 'string'
						? column.columnDef.header
						: column.id?.split('_').join(' ')}
				</label>
			)}

			<div className='flex space-x-2'>
				<DebouncedInput
					type='number'
					value={(columnFilterValue as [number, number])?.[0] ?? ''}
					onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
					placeholder={`Min (${Math.min(...sortedUniqueValues)})`}
					className='flex-1 rounded border'
				/>
				<DebouncedInput
					type='number'
					value={(columnFilterValue as [number, number])?.[1] ?? ''}
					onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
					placeholder={`Max (${Math.max(...sortedUniqueValues)})`}
					className='flex-1 rounded border'
				/>
			</div>
		</div>
	);
}

export default NumberFilter;
