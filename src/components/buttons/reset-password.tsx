import { Lock } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

function ResetPassword({ onClick, ...props }: ButtonProps) {
	return (
		<Button variant={'accent'} size={'icon'} className='size-7 rounded-full' onClick={onClick} {...props}>
			<Lock className='size-4' />
		</Button>
	);
}

export default ResetPassword;
