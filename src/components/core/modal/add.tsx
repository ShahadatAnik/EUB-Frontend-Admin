import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import CoreForm from '@core/form';

import { DevTool } from '@/lib/react-hook-devtool';
import { cn } from '@/lib/utils';

import { IAddModalProps } from './types';

const AddModal: React.FC<IAddModalProps> = ({
	form,
	onSubmit,
	open,
	setOpen,
	title,
	subtitle,
	children,
	className,
	isSmall,
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				className={cn(
					'max-h-[90vh] w-full cursor-default overflow-auto bg-background',
					isSmall && 'sm:max-w-5xl',
					className
				)}
			>
				<DialogHeader>
					<DialogTitle aria-label='Modal Title' aria-description='Modal Title' aria-describedby='Modal Title'>
						{title}
					</DialogTitle>
					<DialogDescription
						className={cn(!subtitle && 'sr-only')}
						aria-label='Modal Subtitle'
						aria-description='Modal Subtitle'
						aria-describedby='Modal Subtitle'
					>
						{subtitle && subtitle}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)} className='relative'>
						<div className='space-y-4'>{children}</div>
						<DialogFooter className='mt-10'>
							<CoreForm.Submit className='w-full' title='Save' />
						</DialogFooter>
						<DevTool control={form.control} placement='top-left' />
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddModal;
