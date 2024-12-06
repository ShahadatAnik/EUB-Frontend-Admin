import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import { FormTextareaProps } from './types';

const FormTextarea: React.FC<FormTextareaProps> = ({
	field,
	label,
	placeholder = 'Write here',
	optional = false,
	className,
	disableLabel,
}) => {
	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center gap-1 capitalize'>
					{label || field.name}{' '}
					{optional ? <span className='text-xs text-muted-foreground'>(Optional)</span> : ''}
				</FormLabel>
			)}
			<FormControl>
				<Textarea
					className={cn(className)}
					placeholder={placeholder}
					{...field}
					value={field.value === null ? '' : field.value}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormTextarea;
