import { UserRoundCog } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

function PageAssign({ onClick, ...props }: ButtonProps) {
	return (
		<Button variant={'accent'} size={'icon'} className='size-7 rounded-full' onClick={onClick} {...props}>
			<UserRoundCog className='size-4' />
		</Button>
	);
}

export default PageAssign;
