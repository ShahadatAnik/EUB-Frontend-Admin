import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { cn } from '@/lib/utils';

import { FormInputProps } from './types';

const FormInput: React.FC<FormInputProps> = ({
	field,
	label,
	subLabel,
	placeholder = 'Write here',
	optional = false,
	type,
	className,
	icon,
	disabled = false,
	disableLabel,
}) => {
	return (
		<FormItem className='w-full space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}

			<FormControl>
				{type === 'password' ? (
					<PasswordInput
						className={cn(className)}
						placeholder={placeholder}
						icon={icon}
						disabled={disabled}
						{...field}
						value={field.value === null ? '' : field.value}
					/>
				) : type === 'number' ? (
					<Input
						className={cn(className)}
						placeholder={placeholder}
						icon={icon}
						disabled={disabled}
						onFocus={(e) => {
							if (Number(e.target.value) === 0) {
								e.target.value = '';
								field.onChange('');
							}
						}}
						{...field}
						value={field.value === null ? '' : field.value}
						onBlur={(e) => {
							field.onChange(e.target.value === '' ? 0 : +e.target.value);
						}}
					/>
				) : (
					<Input
						className={cn(className)}
						placeholder={placeholder}
						type={type}
						icon={icon}
						disabled={disabled}
						{...field}
						value={field.value === null ? '' : field.value}
					/>
				)}
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormInput;
