import { Description } from '@radix-ui/react-dialog';
import { z } from 'zod';

import {
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Visitor Schema
export const PORTFOLIO_VISITOR_SCHEMA = z
	.object({
		name: STRING_REQUIRED,
		mobile: PHONE_NUMBER_REQUIRED,
		category: STRING_REQUIRED.default('call_entry'),
		status: STRING_REQUIRED.default('pending'),

		// Call entry
		subject_preference: STRING_OPTIONAL,
		from_where: STRING_OPTIONAL,

		// FAQ
		prev_institution: STRING_OPTIONAL,
		department: STRING_OPTIONAL,
		through: STRING_OPTIONAL,

		remarks: STRING_NULLABLE,
	})
	.superRefine((data, ctx) => {
		if (data.category === 'call_entry') {
			if (!data.subject_preference) {
				ctx.addIssue({
					path: ['subject_preference'],
					message: 'Required',
					code: z.ZodIssueCode.custom,
				});
			}
		} else if (data.category === 'faq') {
			if (!data.prev_institution) {
				ctx.addIssue({
					path: ['prev_institution'],
					message: 'Required',
					code: z.ZodIssueCode.custom,
				});
			}
			if (!data.department) {
				ctx.addIssue({
					path: ['department'],
					message: 'Required',
					code: z.ZodIssueCode.custom,
				});
			}
		}
	});

export const PORTFOLIO_VISITOR_NULL: Partial<IInquiryVisitor> = {
	name: '',
	mobile: '',
	category: 'call_entry',
	status: 'pending',

	// Call entry
	subject_preference: '',
	from_where: '',

	// FAQ
	prev_institution: '',
	department: '',
	through: '',

	remarks: null,
};

export type IInquiryVisitor = z.infer<typeof PORTFOLIO_VISITOR_SCHEMA>;

export const CONTACT_US_SCHEMA = z.object({
	full_name: STRING_REQUIRED,
	email: STRING_REQUIRED,
	phone: PHONE_NUMBER_REQUIRED,
	question: STRING_REQUIRED,
	description: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const CONTACT_US_NULL: Partial<IContactUs> = {
	full_name: '',
	question: '',
	description: '',
	remarks: null,
};

export type IContactUs = z.infer<typeof CONTACT_US_SCHEMA>;
