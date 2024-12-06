import { z } from 'zod';

export const handelNumberDefaultValue = (value: number) => (value === null ? undefined : value);

export const MAX_IMAGE_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ACCEPTED_ALL_FILE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'video/mp4',
	'video/webm',
	'video/ogg',
	'application/pdf',
];

// STRING
export const STRING = (message = 'Required', typeError = 'Invalid String') =>
	z
		.string({
			required_error: message,
			invalid_type_error: typeError,
		})
		.trim();

export const STRING_NULLABLE = STRING().nullable();
export const STRING_REQUIRED = STRING('Required').min(1, 'Required');
export const STRING_OPTIONAL = STRING().optional();

// DATE
export const DATE = (message = 'Required') => z.date({ required_error: message });
export const DATE_REQUIRED = DATE('Required');
export const DATE_OPTIONAL = DATE().optional();
export const DATE_NULLABLE = DATE().nullable();

// UUID
export const UUID = (message = 'Required') => STRING(message).min(15, 'Invalid Primary Key UUID Length');
export const UUID_REQUIRED = UUID('Required');
export const UUID_FK = UUID().nullable();
export const UUID_PK = UUID_REQUIRED;
export const UUID_NULLABLE = UUID().nullable();

// URL
export const URL = (message = 'Required') => STRING(message).url('Invalid URL');
export const URL_REQUIRED = URL('Required');
export const URL_OPTIONAL = URL().optional();

// NAME
export const NAME = (message = 'Required') => STRING(message).regex(/^[a-zA-Z0-9 ._#-/"'()]*$/, 'Invalid Name');
export const NAME_REQUIRED = NAME('Required').min(1, 'Required');
export const NAME_OPTIONAL = NAME().optional();

// EMAIL
export const EMAIL = (message = 'Required') => STRING(message).email('Invalid Email');
export const EMAIL_REQUIRED = EMAIL('Required');
export const EMAIL_OPTIONAL = EMAIL().optional();
export const EMAIL_NULLABLE = EMAIL().nullable();

// FILE TYPE (IMAGE)
export const IMAGE_FILE = z
	.instanceof(File)
	.refine((file: File) => file?.size <= MAX_IMAGE_FILE_SIZE, `Max image size is 5MB.`)
	.refine(
		(file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
		'Only .jpg, .jpeg, .png and .webp formats are supported.'
	);

export const IMAGE_FILE_REQUIRED = IMAGE_FILE;
export const IMAGE_FILE_OPTIONAL = IMAGE_FILE.optional();

// FILE TYPE (ALL)
export const ALL_FILE = z
	.any()
	.refine((file: File) => file?.size <= MAX_IMAGE_FILE_SIZE, `Max file size is 5MB.`)
	.refine((file: File) => ACCEPTED_ALL_FILE_TYPES.includes(file.type), 'Unsupported file type.');

// JSON STRING
export const JSON_STRING = z.unknown();
export const JSON_STRING_REQUIRED = JSON_STRING;
export const JSON_STRING_OPTION = JSON_STRING.optional();

// BOOLEAN
export const BOOLEAN = (message = 'Required') =>
	z.boolean({
		required_error: message,
	});
export const BOOLEAN_REQUIRED = BOOLEAN('Required');
export const BOOLEAN_DEFAULT_VALUE = (value: boolean) => BOOLEAN().default(value);

export const BOOLEAN_OPTIONAL = BOOLEAN().optional();

// ? email pattern will be after @ is fortunezip.com
// export const FORTUNE_ZIP_EMAIL_PATTERN = EMAIL_REQUIRED.matches(
// 	/^[a-zA-Z0-9._%+-]+@fortunezip.com$/,
// 	"Email: XXXXX@fortunezip.com"
// );

// FORTUNE ZIP EMAIL
export const FORTUNE_ZIP_EMAIL_PATTERN = EMAIL('Required');

// NUMBER (int)
export const NUMBER = (message = 'Required') =>
	z
		.number({
			required_error: message,
		})
		.int()
		.nonnegative();
export const NUMBER_REQUIRED = NUMBER('Required');
export const NUMBER_OPTIONAL = NUMBER().optional();
export const NUMBER_NULLABLE = NUMBER().nullable();

// NUMBER (double)
export const NUMBER_DOUBLE = (message = 'Required') =>
	z
		.number({
			required_error: message,
		})
		.nonnegative();
export const NUMBER_DOUBLE_REQUIRED = NUMBER_DOUBLE('Required');
export const NUMBER_DOUBLE_OPTIONAL = NUMBER_DOUBLE().optional();
export const NUMBER_DOUBLE_NULLABLE = NUMBER_DOUBLE().nullable();

// PHONE NUMBER
export const PHONE_NUMBER = STRING('Required', 'Invalid Phone Number').regex(
	/^$|^\+?\d{4,15}$/,
	'Must be a valid phone number with optional "+" sign and up to 4-15 digits'
);
export const PHONE_NUMBER_REQUIRED = PHONE_NUMBER;
export const PHONE_NUMBER_OPTIONAL = PHONE_NUMBER.optional();
export const PHONE_NUMBER_NULLABLE = PHONE_NUMBER.nullable();

// PASSWORD
export const PASSWORD = STRING_REQUIRED.min(4, 'Password length should be at least 4 characters').max(
	12,
	'Password cannot exceed more than 12 characters'
);

// ORDER NUMBER
export const ORDER_NUMBER = STRING('Required', 'Invalid Order Number').regex(
	// 2021-23 or CS2021-23 or S2021-23
	/^(?:[0-9]{4}-[2]{1}[3-9]{1}|[C]{1}[S]{1}[0-9]{4}-[2]{1}[3-9]{1}|[S]{1}[0-9]{4}-[2]{1}[3-9]{1})$/,
	'O/N format: XXXX-23, CSXXXX-23, SXXXX-23'
);

export const ORDER_NUMBER_NOT_REQUIRED = STRING()
	.regex(
		/^(?:[0-9]{4}-[2]{1}[3-9]{1}|[C]{1}[S]{1}[0-9]{4}-[2]{1}[3-9]{1}|[S]{1}[0-9]{4}-[2]{1}[3-9]{1})$/, // 09877-24
		'O/N format: XXXX-23, CSXXXX-23, SXXXX-23'
	)
	.optional();
