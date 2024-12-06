import { useEffect } from 'react';
import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IPaymentTableData } from '../_config/columns/columns.type'; // TODO: Import Columns Type

import { useTestByUUID } from '../_config/query';
import { ITest, TEST_NULL, TEST_SCHEMA } from '../_config/schema'; // TODO: Import Schema

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IPaymentTableData | null; // TODO: Update type here
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IPaymentTableData | null> // TODO: Update type here
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
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AddOrUpdate: React.FC<IAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useTestByUUID(updatedData?.id as string); // TODO: Replace the query with the actual query

	const form = useRHF(TEST_SCHEMA, TEST_NULL); // TODO: Update schema here

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TEST_NULL); // TODO: Update schema here
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: ITest) {
		// TODO: Update type here
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.id}`, // TODO: Update url here if needed
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			await postData.mutateAsync({
				url, // TODO: Update url here if needed
				newData: {
					...values,
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
			title={isUpdate ? 'Update Test' : 'Add Test'} // TODO: Update title
			form={form}
			onSubmit={onSubmit}
		>
			{/* // TODO: Update form fields ⬇️ */}
			<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
