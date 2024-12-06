import { Trash2 } from 'lucide-react';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';

export function TableRowDelete() {
	const { table, handleDeleteAll } = useTable();

	const selectedRows = table.getSelectedRowModel().rows;

	if (!selectedRows.length) return null;

	return (
		<Button
			aria-label='Delete Selected Rows'
			onClick={() => {
				handleDeleteAll!(selectedRows);
			}}
			size={'sm'}
			variant={'outline-destructive'}
		>
			<Trash2 className='size-4' />
			Delete ({selectedRows.length})
		</Button>
	);
}
