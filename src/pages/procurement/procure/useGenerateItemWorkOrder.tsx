import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { IFormSelectOption } from '@/components/core/form/types';
import DateTime from '@/components/ui/date-time';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherItem } from '@/lib/common-queries/other';
import { getDateTime } from '@/utils';

import { useItemByVendor } from './config/query';
import { ICapital } from './config/schema';

interface IGenerateFieldDefsProps {
	remove: (index: number) => void;
	copy: (index: number) => void;
	watch: UseFormWatch<ICapital>;
	set: UseFormSetValue<ICapital>;
	isUpdate: boolean;
	isNew: boolean;
	data: ICapital;
	form: any;
}

const useGenerateItemWorkOrder = ({
	remove,
	copy,
	isUpdate,
	watch,
	set,
	data,
	form,
}: IGenerateFieldDefsProps): FieldDef[] => {
	// const { data: itemData } = useItemByVendor<IFormSelectOption[]>(watch('vendor_uuid') as string, 'is_active=true');
	const { data: itemData } = useOtherItem<IFormSelectOption[]>();

	return [
		{
			header: 'Item',
			accessorKey: 'item_uuid',
			type: 'select',
			options: itemData || [],
			unique: true,
			excludeOptions:
				data.items.map((item) => item.item_uuid).filter((uuid): uuid is string => uuid !== undefined) || [],
			// onChange(option, field) {
			// 	// const index = field.name.split('.')[1];
			// 	// set(`items.${index}.unit_price`, option?.unit_price);
			// },
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'join-input-unit',
			inputType: 'number',
			unit: (index: number) =>
				itemData?.find((item) => item.value === watch(`items.${index}.item_uuid`))?.unit ?? '',
		},
		// {
		// 	header: 'Unit Price',
		// 	accessorKey: 'unit_price',
		// 	type: 'number',
		// 	// disabled: true,
		// },
		// {
		// 	header: 'Received',
		// 	accessorKey: 'is_received',
		// 	type: 'custom',
		// 	component: (index: number) => {
		// 		return (
		// 			<FormField
		// 				control={form.control}
		// 				name={`items.${index}.is_received`}
		// 				render={(props) => (
		// 					<CoreForm.Checkbox
		// 						disabled={!data.is_work_order}
		// 						label='Received'
		// 						onCheckedChange={() => {
		// 							if (!watch(`items.${index}.is_received`)) {
		// 								set(`items.${index}.is_received`, true, {
		// 									shouldDirty: true,
		// 								});
		// 								set(`items.${index}.received_date`, getDateTime());
		// 							} else {
		// 								set(`items.${index}.is_received`, false, {
		// 									shouldDirty: true,
		// 								});
		// 								set(`items.${index}.received_date`, null);
		// 							}
		// 						}}
		// 						{...props}
		// 					/>
		// 				)}
		// 			/>
		// 		);
		// 	},
		// },
		// {
		// 	header: 'Received Date',
		// 	accessorKey: 'received_date',
		// 	type: 'custom',
		// 	component: (index: number) => {
		// 		return (
		// 			<DateTime
		// 				date={
		// 					watch(`items.${index}.received_date`)
		// 						? new Date(watch(`items.${index}.received_date`) as string)
		// 						: null
		// 				}
		// 				isTime={false}
		// 			/>
		// 		);
		// 	},
		// },
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateItemWorkOrder;
