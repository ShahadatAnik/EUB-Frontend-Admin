import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal } from '@core/modal';

import { useOtherOrderDescription } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime, getTransactionArea } from '@/utils';

import { IActionTrxAgainstOrder } from '../_config/columns/columns.type'; // TODO: Import Columns Type

// TODO: Import Schema
import { ITestTrxAgainstOrder, TEST_TRX_AGAINST_ORDER_NULL, TEST_TRX_AGAINST_ORDER_SCHEMA } from '../_config/schema';

interface IAgainstOrderTransferProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IActionTrxAgainstOrder | null; // TODO: Update type here
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IActionTrxAgainstOrder | null> // TODO: Update type here
	>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AgainstOrderTransfer: React.FC<IAgainstOrderTransferProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const form = useRHF(
		TEST_TRX_AGAINST_ORDER_SCHEMA({
			minStock: 1,
			maxStock: updatedData?.stock || 0,
		}),
		TEST_TRX_AGAINST_ORDER_NULL
	); // TODO: Update schema here

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TEST_TRX_AGAINST_ORDER_NULL); // TODO: Update schema here
		setOpen((prev) => !prev);
	};

	const { data: order } = useOtherOrderDescription<IFormSelectOption[]>();

	// Submit handler
	async function onSubmit(values: ITestTrxAgainstOrder) {
		// TODO: Update type here
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		if (isUpdate) {
			await postData.mutateAsync({
				url,
				newData: {
					...values,
					material_uuid: updatedData.uuid, // TODO: Update New Data
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={'Trx Against Order : ' + updatedData?.name} // TODO: Update title
			form={form}
			onSubmit={onSubmit}
		>
			{/* // TODO: Update form fields ⬇️ */}

			<FormField
				control={form.control}
				name='order_description_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Order' placeholder='Select an Order' options={order!} {...props} />
				)}
			/>

			<FormField
				control={form.control}
				name='trx_to'
				render={(props) => (
					<CoreForm.ReactSelect
						placeholder='Select Transaction Area'
						options={getTransactionArea}
						{...props}
					/>
				)}
			/>

			<FormField
				control={form.control}
				name='trx_quantity'
				render={(props) => (
					<CoreForm.Input
						label={`Trx Quantity`}
						type={'number'}
						subLabel={`Max: ${updatedData?.stock}`}
						placeholder={`Max: ${updatedData?.stock}`}
						{...props}
					/>
				)}
			/>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AgainstOrderTransfer;
