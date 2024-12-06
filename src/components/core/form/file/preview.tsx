import React from 'react';
import { Eye, File, FileImage, Trash2, Video } from 'lucide-react';

import TooltipWrapper from '@/components/others/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { useFormFile } from '.';
import { IFileType } from '../types';

const FileType: React.FC<{ type: IFileType }> = ({ type }) => {
	switch (type) {
		case 'image':
			return <FileImage className='size-4' />;
		case 'video':
			return <Video className='size-4' />;
		case 'application':
			return <File className='size-4' />;

		default:
			return <File className='size-4' />;
	}
};

const FilePreview: React.FC<{ file: File; index?: number }> = ({ file, index }) => {
	const { onDelete } = useFormFile();

	const type = file.type.split('/')[0] as IFileType;

	return (
		<li
			className='bg-gradient flex items-center justify-between gap-4 rounded border border-input px-2 py-1'
			key={file.name}
		>
			<div className='flex items-center gap-2'>
				<FileType type={type} />
				<TooltipWrapper message={file.name}>
					<p className='max-w-[260px] truncate text-sm'>{file.name}</p>
				</TooltipWrapper>
			</div>

			<div className='flex items-center'>
				<Dialog>
					<DialogTrigger asChild>
						<Button size={'icon'} variant='ghost' className='rounded-full'>
							<Eye className='size-4' />
						</Button>
					</DialogTrigger>
					<DialogContent className='p-2 sm:max-w-[725px]'>
						<div className='aspect-video h-full'>
							{type === 'image' && (
								<img
									className='size-full object-contain'
									src={URL.createObjectURL(file)}
									alt={file.name}
								/>
							)}
							{type === 'video' && (
								<video
									muted
									controls
									className='size-full rounded object-contain'
									src={URL.createObjectURL(file)}
								/>
							)}
							{type === 'application' && (
								<iframe src={URL.createObjectURL(file)} width='100%' height='100%' />
							)}
						</div>
					</DialogContent>
				</Dialog>
				<Button
					onClick={() => onDelete(index)}
					type='button'
					size={'icon'}
					variant='ghost-destructive'
					className='rounded-full'
				>
					<Trash2 className='size-4' />
				</Button>
			</div>
		</li>
	);
};

interface PreviewProps {
	files: FileList | File;
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
	if (Array.isArray(files)) {
		return (
			<ul className='mt-2 space-y-2'>
				{Array.from(files).map((file, index) => {
					return (
						<li key={file.name}>
							<FilePreview file={file} index={index} />
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<div className='mt-2'>
			<FilePreview file={files as File} />
		</div>
	);
};

export default Preview;
