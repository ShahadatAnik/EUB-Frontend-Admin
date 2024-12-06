import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { cn } from '@/lib/utils';

import { FormEditorProps } from '../types';

const FormEditor: React.FC<FormEditorProps> = ({
	field,
	label,
	subLabel,
	placeholder = 'Write here',
	optional = false,
	icon,
	disableLabel,
}) => {
	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs text-muted-foreground'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}

			<FormControl>
				<div className='h-[400px]'>
					<ReactQuill
						className='h-[90%]'
						placeholder='Write here'
						theme='snow'
						value={field.value}
						onChange={field.onChange}
					/>
				</div>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormEditor;
