import React, { useCallback } from 'react';
import { IToolbarOptions } from '@/types';
import { Cross2Icon } from '@radix-ui/react-icons';
import { isValid } from 'date-fns';
import { CirclePlus, SearchIcon } from 'lucide-react';
import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import TableDateRange from './date-range';
import TableExportCSV from './export-csv';
import TableAllFilter from './filter';
import TableAdvanceFilters from './filter/advance';
import { TableFacetedFilter } from './filter/faceted';
import TableRefresh from './refresh';
import { TableRowDelete } from './row/delete';
import TableTitle from './title';
import { TableViewOptions } from './view-options';

// Interface for ToolbarComponent props
interface ToolbarComponentProps {
	option: IToolbarOptions;
	render: () => React.ReactNode;
}

/**
 * ToolbarComponent - Renders a toolbar item based on the provided option
 * @param option - The toolbar option to check
 * @param render - Function to render the toolbar item
 */
const ToolbarComponent: React.FC<ToolbarComponentProps> = React.memo(({ option, render }) => {
	const { toolbarOptions } = useTable();

	if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
		return render();
	}
	return null;
});

ToolbarComponent.displayName = 'ToolbarComponent';

/**
 * TableToolbar - Main component for rendering the table toolbar
 */
export function TableToolbar() {
	const { createAccess } = usePage();
	const {
		title,
		subtitle,
		table,
		toolbarOptions,
		handleCreate,
		handleRefetch,
		globalFilterValue,
		facetedFilters,
		advanceFilters,
		isEntry,
		start_date,
		end_date,
		onUpdate,
		onClear,
		isClear,
		initialDateRange,
	} = useTable();

	const column = table.getColumn('created_at');
	const columnFilterValue = column?.getFilterValue() as [Date, Date];

	const startDate = start_date || columnFilterValue?.[0] || initialDateRange[0];
	const endDate = end_date || columnFilterValue?.[1] || initialDateRange[1];

	const isFiltered = table.getState().columnFilters.length > 0;

	// Memoize the callback for resetting column filters
	const resetColumnFilters = useCallback(() => table.resetColumnFilters(), [table]);

	// Memoize the callback for setting global filter
	const setGlobalFilter = useCallback((value: string | number) => table.setGlobalFilter(value), [table]);

	/**
	 * Renders the left section of the toolbar
	 */
	const renderLeftSection = useCallback(
		() => (
			<div className='flex flex-1 items-center space-x-2'>
				<ToolbarComponent
					option='all-filter'
					render={() =>
						table.getAllColumns().filter((column) => column.getCanFilter()).length > 0 && <TableAllFilter />
					}
				/>
				<ToolbarComponent option='view' render={() => <TableViewOptions table={table} />} />
				<ToolbarComponent
					option='date-range'
					render={() => (
						<TableDateRange
							table={table}
							start_date={startDate}
							end_date={endDate}
							onUpdate={onUpdate}
							onClear={onClear}
							isClear={isClear}
						/>
					)}
				/>
				<ToolbarComponent
					option='faceted-filter'
					render={() =>
						facetedFilters?.map((filter) => {
							const column = table.getColumn(filter.id);
							return column ? (
								<TableFacetedFilter
									key={filter.id}
									column={column}
									title={filter.title}
									options={filter.options}
								/>
							) : null;
						})
					}
				/>
				<ToolbarComponent
					option='advance-filter'
					render={() =>
						advanceFilters && advanceFilters?.length > 0 ? (
							<TableAdvanceFilters filters={advanceFilters} />
						) : null
					}
				/>
				{isFiltered && (
					<Button
						aria-label='Reset filters'
						variant='outline-destructive'
						onClick={resetColumnFilters}
						className='h-8'
					>
						Reset
						<Cross2Icon className='size-4' />
					</Button>
				)}
				<Separator orientation='vertical' className='h-6' />

				<ToolbarComponent
					option='export-csv'
					render={() =>
						isValid(startDate) &&
						isValid(endDate) && <TableExportCSV start_date={startDate} end_date={endDate} />
					}
				/>
			</div>
		),
		[
			table,
			facetedFilters,
			advanceFilters,
			isFiltered,
			resetColumnFilters,
			onUpdate,
			startDate,
			endDate,
			onClear,
			isClear,
		]
	);

	/**
	 * Renders the right section of the toolbar
	 */
	const renderRightSection = useCallback(
		() => (
			<div className='flex gap-4'>
				<TableRowDelete />
				<ToolbarComponent
					option='refresh'
					render={() => handleRefetch && <TableRefresh handleRefetch={handleRefetch} />}
				/>
				<ToolbarComponent
					option='new-entry'
					render={() =>
						createAccess && (
							<Button aria-label='Create new entry' onClick={handleCreate} variant='accent' size='sm'>
								<CirclePlus className='size-4' />
								New
							</Button>
						)
					}
				/>
			</div>
		),
		[handleRefetch, createAccess, handleCreate]
	);

	if (isEntry) {
		return (
			<div className='flex items-center justify-between overflow-hidden rounded-t-md bg-primary px-4 py-3'>
				<div className='flex items-center justify-between gap-4'>
					<TableTitle
						title={title}
						subtitle={subtitle}
						titleClassName={
							'text-2xl font-semibold capitalize leading-tight text-primary-foreground md:text-3xl'
						}
					/>
					{toolbarOptions === 'none' ? null : (
						<div className={cn('flex items-center justify-between')}>
							{renderLeftSection()}
							{renderRightSection()}
						</div>
					)}
				</div>{' '}
				<DebouncedInput
					icon={<SearchIcon className={cn('size-5 text-white/50')} />}
					value={globalFilterValue ?? ''}
					onChange={setGlobalFilter}
					className={cn('bg-gradient-accent h-10 w-full border-accent/10 lg:max-w-[300px]')}
					placeholder='Search...'
				/>
			</div>
		);
	}

	return (
		<div className={cn('mb-4 flex w-full flex-col overflow-hidden')}>
			<div
				className={cn('mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end')}
			>
				<TableTitle title={title} subtitle={subtitle} />
				<DebouncedInput
					icon={<SearchIcon className={cn('size-5 text-secondary/50')} />}
					value={globalFilterValue ?? ''}
					onChange={setGlobalFilter}
					className={cn('h-10 w-full lg:max-w-[300px]')}
					placeholder='Search...'
				/>
			</div>
			{toolbarOptions === 'none' ? null : (
				<div className={cn('flex items-center justify-between')}>
					{renderLeftSection()}
					{renderRightSection()}
				</div>
			)}
		</div>
	);
}
