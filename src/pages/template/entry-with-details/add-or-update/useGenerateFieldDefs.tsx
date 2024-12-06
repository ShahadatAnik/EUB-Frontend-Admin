import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@core/form/types';

import { ITest3 } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<ITest3>; // TODO: Update Schema Type
}

const useGenerateFieldDefs = ({ copy, remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	const designationOptions: IFormSelectOption[] = [
		{
			label: 'Software Engineer',
			value: 'software_engineer',
		},
		{
			label: 'Project Manager',
			value: 'project_manager',
		},
		{
			label: 'Video Editor',
			value: 'video_editor',
		},
	];

	const departmentOptions: IFormSelectOption[] = [
		{
			label: 'IT',
			value: 'it',
		},
		{
			label: 'HR',
			value: 'hr',
		},
	];

	return [
		{
			header: 'Name',
			accessorKey: 'name',
			type: 'text',
		},
		{
			header: 'Email',
			accessorKey: 'email',
			type: 'text',
		},
		{
			header: 'Phone',
			accessorKey: 'phone',
			type: 'text',
		},
		{
			header: 'Designation',
			accessorKey: 'designation',
			type: 'select',
			placeholder: 'Select Designation',
			options: designationOptions,
		},
		{
			header: 'Department',
			accessorKey: 'department',
			type: 'select',
			placeholder: 'Select Department',
			options: departmentOptions,
		},
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

export default useGenerateFieldDefs;
