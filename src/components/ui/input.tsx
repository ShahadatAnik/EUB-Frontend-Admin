import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon = null, iconPosition = 'left', ...props }, ref) => {
		const inputClass =
			'flex h-10 w-full rounded-md border border-input bg-gradient px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:from-destructive/5 disabled:to-destructive/5 disabled:border-destructive/30 disabled:text-destructive';

		return icon ? (
			<div className={cn(inputClass, 'items-center gap-2', className)}>
				{icon && iconPosition === 'left' && icon}
				<input
					autoFocus
					type={type}
					className='w-full bg-transparent focus:outline-none focus:ring-0'
					ref={ref}
					{...props}
				/>
				{icon && iconPosition === 'right' && icon}
			</div>
		) : (
			<input type={type} className={cn(inputClass, className)} ref={ref} {...props} />
		);
	}
);

Input.displayName = 'Input';

export { Input };
