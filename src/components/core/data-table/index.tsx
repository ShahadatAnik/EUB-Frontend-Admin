import { flexRender } from '@tanstack/react-table';
import useTable from '@/hooks/useTable';

import { TableBody, TableCell, Table as TableComponent, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { TableColumnHeader } from './_components/column-header';
import { TablePagination } from './_components/pagination';
import TableSkeleton from './_components/skeleton';
import { TableToolbar } from './_components/toolbar';
import { getCommonPinningStyles } from './_helpers/getCommonPinningStyle';

function DataTable() {
	const { table, isLoading, isEntry } = useTable();

	return (
		<div>
			<TableToolbar />
			<div className={cn('overflow-hidden border border-secondary/10', isEntry ? 'rounded-b-md' : 'rounded-md')}>
				<TableComponent>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const content = header.column.columnDef.header;
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												...getCommonPinningStyles({
													column: header.column,
													isHeader: true,
												}),
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														typeof content === 'string' ? (
															<TableColumnHeader column={header.column} />
														) : (
															content
														),
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className='divide-y-[1px] divide-secondary/10'>
						{isLoading ? (
							<TableSkeleton colSpan={table.getAllColumns().length} />
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{
												...getCommonPinningStyles({
													column: cell.column,
												}),
											}}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</TableComponent>

				<TablePagination />
			</div>
		</div>
	);
}

export default DataTable;
