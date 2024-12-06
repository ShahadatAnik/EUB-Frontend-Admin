import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormContext } from 'react-hook-form';

import { Button, ButtonProps } from '@/components/ui/button';

const FormSubmit: React.FC<
	ButtonProps & {
		title?: string;
	}
> = ({ title = 'Submit', ...props }) => {
	const {
		formState: { isSubmitting, isDirty },
	} = useFormContext();
	return (
		<Button aria-label='Submit Form' disabled={!isDirty || isSubmitting} type='submit' {...props}>
			{isSubmitting && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
			{isSubmitting ? `Please wait...` : title}
		</Button>
	);
};

export default FormSubmit;
