import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { getDateTime } from '@/utils';

import { IResetPassword } from '../_config/columns/columns.type';
import { IResetPasswordSchema, RESET_PASSWORD_NULL, RESET_PASSWORD_SCHEMA } from '../_config/schema';

interface IResetPasswordProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IResetPassword | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IResetPassword | null>>;
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

const ResetPassword: React.FC<IResetPasswordProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const form = useRHF(RESET_PASSWORD_SCHEMA, RESET_PASSWORD_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(RESET_PASSWORD_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IResetPasswordSchema) {
		await updateData.mutateAsync({
			url,
			updatedData: {
				...values,
				updated_at: getDateTime(),
			},
			onClose,
		});
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={`Reset Password - ${updatedData?.name}`}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='pass'
				render={(props) => <CoreForm.Input label='Password' type='password' {...props} />}
			/>

			<FormField
				control={form.control}
				name='repeatPass'
				render={(props) => <CoreForm.Input label={`Repeat Password`} type={'password'} {...props} />}
			/>
		</AddModal>
	);
};

export default ResetPassword;
