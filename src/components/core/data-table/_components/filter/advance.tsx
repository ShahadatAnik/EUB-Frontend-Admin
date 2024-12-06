import { ITableAdvanceFilter } from '@/types';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

interface IProps {
	filters: ITableAdvanceFilter[];
}

const TableAdvanceFilters = ({ filters }: IProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-label='Switch Options' variant='gradient' size='sm' className='hidden lg:flex'>
					<Filter className='size-4' />
					Advanced
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='max-h-[400px] w-fit min-w-[200px] overflow-auto'>
				{filters.map((item) => {
					return (
						<DropdownMenuItem key={item.label} className='flex justify-between capitalize'>
							{item.label}

							<Switch checked={!!item.state} onCheckedChange={() => item.onStateChange()} />
						</DropdownMenuItem>
					);
				})}

				<DropdownMenuSeparator />

				<div className='flex justify-between'>
					<Button
						variant={'ghost'}
						onClick={() => filters.forEach((item) => item.clear())}
						size='sm'
						className='w-fit'
					>
						Reset
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TableAdvanceFilters;
