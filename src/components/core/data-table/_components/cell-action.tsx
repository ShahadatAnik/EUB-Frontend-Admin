import { CellContext } from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';
import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';

interface ITableCellActionProps<TData, TValue> {
	info: CellContext<TData, TValue>;
}

function TableCellAction<TData, TValue>({ info }: ITableCellActionProps<TData, TValue>) {
	const row = info.row;
	const { updateAccess, deleteAccess } = usePage();
	const { handleUpdate, handleDelete } = useTable();

	return (
		<div className='flex w-full items-center justify-center gap-1'>
			{updateAccess && (
				<Button
					aria-label='Edit Row'
					onClick={() => handleUpdate?.(row)}
					size={'icon'}
					variant={'ghost'}
					className='rounded-full'
				>
					<SquarePen className='size-4' />
				</Button>
			)}
			{deleteAccess && (
				<Button
					aria-label='Delete Row'
					onClick={() => handleDelete?.(row)}
					size={'icon'}
					variant={'ghost-destructive'}
					className='rounded-full'
				>
					<Trash2 className='size-4' />
				</Button>
			)}
		</div>
	);
}

export default TableCellAction;
