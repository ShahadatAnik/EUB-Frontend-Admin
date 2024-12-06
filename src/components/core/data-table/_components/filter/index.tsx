import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { X } from 'lucide-react';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import TableColumnFilter from './column';

const TableAllFilter = () => {
	const { table } = useTable();

	const filteredColumns = table
		.getAllFlatColumns()
		.filter((column) => column.columnDef.meta?.disableFullFilter !== true);

	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button aria-label='Filters All Columns' variant='gradient' size='sm' className='hidden lg:flex'>
					<MixerHorizontalIcon className='size-4' />
					Filters
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col'>
				<SheetHeader className='border-b pb-2'>
					<SheetTitle className='flex items-center gap-2'>
						<MixerHorizontalIcon className='size-4' /> All Filters
					</SheetTitle>
					<SheetDescription className='sr-only'>
						This action cannot be undone. This will permanently delete your account and remove your data
						from our servers.
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className='mt-4 flex-1'>
					<div className='flex flex-col gap-4'>
						{filteredColumns.length > 0 &&
							filteredColumns.map((column) => (
								<TableColumnFilter key={column.id} showLabel column={column} />
							))}
					</div>
				</ScrollArea>

				<SheetFooter className='justify-start'>
					{isFiltered && (
						<Button variant='outline-destructive' size='sm' onClick={() => table.resetColumnFilters()}>
							Reset
							<X className='size-4' />
						</Button>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default TableAllFilter;
