import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { ListFilter, Pin, PinOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { TableColumnHeaderProps } from '../types';
import TableColumnFilter from './filter/column';

export function TableColumnHeader<TData, TValue>({ column, className }: TableColumnHeaderProps<TData, TValue>) {
	const title = column.columnDef.header as string;

	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn('flex items-center', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						aria-label='Sort Column'
						variant='ghost'
						size='sm'
						className='-ml-3 h-7 active:scale-100 data-[state=open]:bg-base-300'
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<ArrowDownIcon className='size-4' />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUpIcon className='size-4' />
						) : (
							<CaretSortIcon className='size-4' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowUpIcon className='mr-2 size-3.5 text-muted-foreground/70' />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDownIcon className='mr-2 size-3.5 text-muted-foreground/70' />
						Desc
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					{column.getCanPin() && (
						<DropdownMenuItem
							onClick={() => {
								if (column.getIsPinned() === 'left') {
									column.pin(false);
								} else {
									column.pin('left');
								}
							}}
						>
							{column.getIsPinned() === 'left' ? (
								<PinOff className='mr-2 size-3.5 text-muted-foreground/70' />
							) : (
								<Pin className={'mr-2 size-3.5 text-muted-foreground/70'} />
							)}
							<span>{column.getIsPinned() === 'left' ? 'Unpin' : 'Pin to left'}</span>
						</DropdownMenuItem>
					)}

					{column.getCanHide() && (
						<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
							<EyeNoneIcon className='mr-2 size-3.5 text-muted-foreground/70' />
							Hide
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			{column.getCanFilter() ? (
				<Popover>
					<PopoverTrigger asChild>
						<Button aria-label='Column Filter' variant='ghost' size={'icon'}>
							<ListFilter className='size-4' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-fit bg-background p-2'>
						<TableColumnFilter column={column} />
					</PopoverContent>
				</Popover>
			) : null}
		</div>
	);
}
