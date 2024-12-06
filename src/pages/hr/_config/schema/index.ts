import { z } from 'zod';

import {
	FORTUNE_ZIP_EMAIL_PATTERN,
	PASSWORD,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Department Schema
export const DEPARTMENT_SCHEMA = z.object({
	department: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DEPARTMENT_NULL: Partial<IDepartment> = {
	department: '',
	remarks: null,
};

export type IDepartment = z.infer<typeof DEPARTMENT_SCHEMA>;

// Designation Schema
export const DESIGNATION_SCHEMA = z.object({
	designation: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const DESIGNATION_NULL: Partial<IDesignation> = {
	designation: '',
	remarks: null,
};

export type IDesignation = z.infer<typeof DESIGNATION_SCHEMA>;

// User Schema
export const USER_SCHEMA = (isUpdate: boolean) => {
	const baseSchema = z.object({
		name: STRING_REQUIRED,
		email: FORTUNE_ZIP_EMAIL_PATTERN,
		department_uuid: STRING_REQUIRED,
		designation_uuid: STRING_REQUIRED,
		ext: STRING_NULLABLE,
		phone: PHONE_NUMBER_REQUIRED,
		remarks: STRING_NULLABLE,
	});

	if (isUpdate) {
		return baseSchema.extend({
			pass: STRING_OPTIONAL,
			repeatPass: STRING_OPTIONAL,
		});
	}

	return baseSchema
		.extend({
			pass: PASSWORD,
			repeatPass: PASSWORD,
		})
		.refine((data) => data.pass === data.repeatPass, {
			message: 'Passwords do not match',
			path: ['repeatPass'],
		});
};

export const USER_NULL: Partial<IUser> = {
	name: '',
	email: '',
	department_uuid: '',
	designation_uuid: '',
	ext: null,
	phone: '',
	remarks: null,
};

export type IUser = z.infer<ReturnType<typeof USER_SCHEMA>>;

// Reset Password Schema
export const RESET_PASSWORD_SCHEMA = z
	.object({
		pass: PASSWORD,
		repeatPass: PASSWORD,
	})
	.refine((data) => data.pass === data.repeatPass, {
		message: 'Passwords do not match',
		path: ['repeatPass'],
	});

export const RESET_PASSWORD_NULL: Partial<IResetPasswordSchema> = {
	pass: '',
	repeatPass: '',
};

export type IResetPasswordSchema = z.infer<typeof RESET_PASSWORD_SCHEMA>;
