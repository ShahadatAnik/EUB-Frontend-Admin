import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { cn } from '@/lib/utils';

import { useFormFile } from '.';
import Placeholder from './placeholder';
import Preview from './preview';

const SingleFile = () => {
	const [onDrag, setOnDrag] = useState(false);
	const { field, label, subLabel, optional, accept, disableLabel } = useFormFile();

	const file = field.value as File | null;

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

			<FormControl>
				<div>
					<Dropzone
						accept={accept}
						onError={(err) => console.log(err)}
						onDragEnter={() => setOnDrag(true)}
						onDragLeave={() => setOnDrag(false)}
						onDropAccepted={() => setOnDrag(false)}
						onDropRejected={() => setOnDrag(false)}
						onDrop={(acceptedFiles) => {
							field.onChange(acceptedFiles[0]);
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<div
								className={cn(
									'bg-gradient relative aspect-video rounded border-2 border-dashed',
									onDrag && 'border-blue-600/50'
								)}
								{...getRootProps()}
							>
								{onDrag ? <div className='absolute inset-0 z-10 rounded bg-blue-600/50'></div> : null}
								<input {...getInputProps()} />
								<Placeholder />
							</div>
						)}
					</Dropzone>
					{file ? <Preview files={file} /> : null}
				</div>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default SingleFile;
