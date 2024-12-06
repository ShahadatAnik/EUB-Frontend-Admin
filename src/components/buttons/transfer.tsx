import { Repeat } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

function Transfer({ onClick, ...props }: ButtonProps) {
	return (
		<Button variant={'accent'} size={'icon'} className='size-7 rounded-full' onClick={onClick} {...props}>
			<Repeat className='size-4' />
		</Button>
	);
}

export default Transfer;
