import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { INews_Portal } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<INews_Portal>();

	return (
		<CoreForm.Section title='Information' className='md:grid-cols-1 lg:grid-cols-2 lg:gap-8'>
			<div className='space-y-2.5'>
				<FormField control={form.control} name='title' render={(props) => <CoreForm.Input {...props} />} />

				<FormField
					control={form.control}
					name='subtitle'
					render={(props) => <CoreForm.Input optional {...props} />}
				/>
				<FormField
					control={form.control}
					name='description'
					render={(props) => <CoreForm.Textarea {...props} />}
				/>
				<FormField
					control={form.control}
					name='cover_image'
					render={(props) => (
						<CoreForm.File
							accept={{ 'image/*': ['jpg', 'jpeg', 'png', 'webp', 'gif'] }}
							onDelete={() => {
								form.setValue('cover_image', undefined);
							}}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='published_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>

				<FormField
					control={form.control}
					name='remarks'
					render={(props) => <CoreForm.Textarea optional {...props} />}
				/>
			</div>

			<div className='space-y-2.5'>
				<FormField
					control={form.control}
					name='content'
					render={(props) => <CoreForm.RichTextEditor {...props} />}
				/>

				<FormField
					control={form.control}
					name='documents'
					render={(props) => (
						<CoreForm.File
							multi
							accept={{
								'image/*': ['jpg', 'jpeg', 'png', 'webp', 'gif'],
								'video/*': ['mp4', 'ogg', 'webm'],
								'application/pdf': ['pdf'],
							}}
							onDelete={(index) => {
								form.setValue(
									'documents',
									form.getValues('documents').filter((_, i) => i !== index)
								);
							}}
							{...props}
						/>
					)}
				/>
			</div>
		</CoreForm.Section>
	);
};

export default Header;
