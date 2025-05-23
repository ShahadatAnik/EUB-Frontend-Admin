import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_NULLABLE,
	NUMBER_REQUIRED,
	PHONE_NUMBER_OPTIONAL,
	PHONE_NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Requisition Schema
export const REQUISITION_SCHEMA = z
	.object({
		is_received: BOOLEAN_REQUIRED.default(false),
		is_store_received: BOOLEAN_REQUIRED.default(false),
		received_date: STRING_NULLABLE,
		store_received_date: STRING_NULLABLE,
		remarks: STRING_NULLABLE,
		item_requisition: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				requisition_uuid: STRING_OPTIONAL,
				item_uuid: STRING_REQUIRED,
				req_quantity: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
				stock_quantity: NUMBER_NULLABLE,
				provided_quantity: NUMBER_REQUIRED,
				remarks: STRING_NULLABLE,
			})
		),
		new_item_requisition: z
			.array(
				z.object({
					uuid: STRING_OPTIONAL,
					requisition_uuid: STRING_OPTIONAL,
					item_uuid: STRING_REQUIRED,
					req_quantity: NUMBER_REQUIRED.min(1, 'Must be greater than 0'),
					stock_quantity: NUMBER_NULLABLE,
					provided_quantity: NUMBER_REQUIRED,
					remarks: STRING_NULLABLE,
				})
			)
			.optional(),
	})
	.superRefine((data, ctx) => {
		if (data.is_received && !data.received_date) {
			ctx.addIssue({
				code: 'custom',
				message: 'Received Date is required',
			});
		}
		data.item_requisition.forEach((item, index) => {
			if (item?.provided_quantity > item?.req_quantity) {
				ctx.addIssue({
					code: 'custom',
					message: 'Provided quantity cannot be greater than required quantity',
					path: [`item_requisition.${index}.provided_quantity`],
				});
			}
			if (item?.stock_quantity != null && item?.provided_quantity > item.stock_quantity) {
				ctx.addIssue({
					code: 'custom',
					message: 'Provided quantity cannot be greater than stock quantity',
					path: [`item_requisition.${index}.provided_quantity`],
				});
			}
		});
	});

export const REQUISITION_NULL: Partial<IRequisition> = {
	is_received: false,
	is_store_received: false,
	received_date: null,
	store_received_date: null,
	remarks: '',
	item_requisition: [],
	new_item_requisition: [],
};

export type IRequisition = z.infer<typeof REQUISITION_SCHEMA>;
