import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime, getTransactionArea } from '@/utils';

import { IActionTrx } from '../_config/columns/columns.type'; // TODO: Import Columns Type
import { ITestStock, TEST_STOCK_NULL, TEST_STOCK_SCHEMA } from '../_config/schema';

// TODO: Import Schema

interface IAgainstTrxProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IActionTrx | null; // TODO: Update type here
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IActionTrx | null> // TODO: Update type here
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

const AgainstTrx: React.FC<IAgainstTrxProps> = ({ url, open, setOpen, updatedData, setUpdatedData, postData }) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();

	const form = useRHF(TEST_STOCK_SCHEMA({ minStock: 1, maxStock: updatedData?.stock || 0 }), TEST_STOCK_NULL); // TODO: Update schema here

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TEST_STOCK_NULL); // TODO: Update schema here
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: ITestStock) {
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
			title={'Trx Against ' + updatedData?.name} // TODO: Update title
			form={form}
			onSubmit={onSubmit}
		>
			{/* // TODO: Update form fields ⬇️ */}
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

export default AgainstTrx;
