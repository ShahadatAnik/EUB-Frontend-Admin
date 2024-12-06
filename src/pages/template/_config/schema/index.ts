import { z } from 'zod';

import { NUMBER_DOUBLE_REQUIRED, STRING_NULLABLE, STRING_OPTIONAL, STRING_REQUIRED } from '@/utils/validators';

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_SCHEMA = z.object({
	email: STRING_REQUIRED,
});
export const TEST_NULL: Partial<ITest> = {
	email: 'alif@example.com',
};
export type ITest = z.infer<typeof TEST_SCHEMA>;

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_SCHEMA_3 = z.object({
	company_name: STRING_REQUIRED,
	company_address: STRING_REQUIRED,
	company_phone: STRING_REQUIRED,
	company_email: STRING_REQUIRED,
	company_size: STRING_REQUIRED,
	employees: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			name: STRING_REQUIRED,
			email: STRING_REQUIRED,
			phone: STRING_REQUIRED,
			designation: STRING_REQUIRED,
			department: STRING_REQUIRED,
		})
	),
});
export const TEST_NULL_3 = {
	company_name: '',
	company_address: '',
	company_phone: '',
	company_email: '',
	company_size: '',
	employees: [],
};
export type ITest3 = z.infer<typeof TEST_SCHEMA_3>;

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_STOCK_SCHEMA = ({ minStock, maxStock } = { minStock: 0, maxStock: 0 }) =>
	z.object({
		trx_to: STRING_REQUIRED,
		trx_quantity: NUMBER_DOUBLE_REQUIRED.min(minStock, `Quantity can't be less than ${minStock}`).max(
			maxStock,
			`Quantity can't be more than ${maxStock}`
		),
		remarks: STRING_NULLABLE,
	});

export const TEST_STOCK_NULL: Partial<ITestStock> = {
	trx_to: '',
	trx_quantity: 0,
	remarks: '',
};
const testStockSchema = TEST_STOCK_SCHEMA();

export type ITestStock = z.infer<typeof testStockSchema>;

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_TRX_AGAINST_ORDER_SCHEMA = ({ minStock, maxStock } = { minStock: 0, maxStock: 0 }) =>
	z.object({
		order_description_uuid: STRING_REQUIRED,
		trx_to: STRING_REQUIRED,
		trx_quantity: NUMBER_DOUBLE_REQUIRED.min(minStock, `Quantity can't be less than ${minStock}`).max(
			maxStock,
			`Quantity can't be more than ${maxStock}`
		),
		remarks: STRING_NULLABLE,
	});

export const TEST_TRX_AGAINST_ORDER_NULL: Partial<ITestTrxAgainstOrder> = {
	order_description_uuid: '',
	trx_to: '',
	trx_quantity: 0,
	remarks: '',
};
const testTrxAgainstOrderSchema = TEST_TRX_AGAINST_ORDER_SCHEMA();

export type ITestTrxAgainstOrder = z.infer<typeof testTrxAgainstOrderSchema>;
