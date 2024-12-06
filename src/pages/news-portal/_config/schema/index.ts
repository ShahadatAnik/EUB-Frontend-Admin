import { z } from 'zod';

import { IMAGE_FILE_REQUIRED, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

export const NEWS_PORTAL_SCHEMA = z.object({
	title: STRING_REQUIRED,
	subtitle: STRING_OPTIONAL,
	description: STRING_REQUIRED,
	content: STRING_REQUIRED,
	documents: z.array(
		IMAGE_FILE_REQUIRED.or(z.object({ uuid: STRING_REQUIRED, type: STRING_REQUIRED, url: STRING_REQUIRED }))
	),
	cover_image: IMAGE_FILE_REQUIRED.or(STRING_OPTIONAL),
	published_date: STRING_REQUIRED,
	remarks: STRING_OPTIONAL,
});
export const NEWS_PORTAL_NULL: Partial<INews_Portal> = {};
export type INews_Portal = z.infer<typeof NEWS_PORTAL_SCHEMA>;
