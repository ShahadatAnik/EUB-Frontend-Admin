import React from 'react';
import { Upload } from 'lucide-react';

import { useFormFile } from '.';

const Placeholder = () => {
	const { placeholder } = useFormFile();
	return (
		<div className='flex size-full flex-col items-center justify-center gap-2'>
			<Upload />
			<p className='text-sm font-medium'>{placeholder || 'Click to upload or drag and drop'}</p>
		</div>
	);
};

export default Placeholder;
