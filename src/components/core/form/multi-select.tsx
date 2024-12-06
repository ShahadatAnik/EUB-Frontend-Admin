import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import { FormMultiSelectProps } from './types';

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
	field,
	label,
	placeholder = 'Select an option',
	optional = false,
	options,
	isDisabled = false,
	disableLabel,
}) => {
	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					{label || field.name.split('_').join(' ')}{' '}
					{optional ? <span className='text-xs'>(Optional)</span> : ''}
				</FormLabel>
			)}
			<FormControl>
				<MultiSelect
					disabled={isDisabled}
					options={options as any}
					onValueChange={field.onChange}
					defaultValue={field.value}
					placeholder={placeholder}
					variant='default'
					maxCount={3}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormMultiSelect;
