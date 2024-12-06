import { buttonVariants } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { cn } from '@/lib/utils';

import { FormJoinInputUnitProps } from './types';

const FormJoinInputUnit: React.FC<FormJoinInputUnitProps> = ({
	field,
	label,
	subLabel,
	placeholder = 'Write here',
	optional = false,
	type,
	className = 'border-0 w-8 bg-transparent',
	icon,
	unit,
	disableLabel,
}) => {
	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}
			<div className='bg-gradient flex h-10 items-center overflow-hidden rounded-md border border-input p-0.5'>
				<FormControl className='h-8 flex-1'>
					{type === 'password' ? (
						<PasswordInput className={cn(className)} placeholder={placeholder} icon={icon} {...field} />
					) : type === 'number' ? (
						<Input
							className={cn(className)}
							placeholder={placeholder}
							icon={icon}
							{...field}
							onBlur={(e) => {
								field.onChange(+e.target.value);
							}}
						/>
					) : (
						<Input className={cn(className)} placeholder={placeholder} type={type} icon={icon} {...field} />
					)}
				</FormControl>

				<span
					className={buttonVariants({
						variant: 'accent',
						className:
							'h-8 max-w-[100px] justify-between truncate rounded bg-gradient-to-r from-accent to-accent capitalize',
					})}
				>
					{unit}
				</span>
			</div>
			<FormMessage />
		</FormItem>
	);
};

export default FormJoinInputUnit;
