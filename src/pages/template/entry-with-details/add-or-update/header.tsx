import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import { ITest3 } from '../../_config/schema';

// TODO: Update this component according to the schema ⬇️
const Header = () => {
	const form = useFormContext<ITest3>(); // TODO: Update Schema Type

	const options: IFormSelectOption[] = [
		{ label: 'Small', value: 'small' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'Large', value: 'large' },
	];

	return (
		<CoreForm.Section title='Information'>
			<FormField control={form.control} name='company_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='company_email' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='company_address'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='company_phone'
				render={(props) => <CoreForm.Input type={'tel'} {...props} />}
			/>
			<FormField
				control={form.control}
				name='company_size'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Company Size'
						placeholder='Select Company Size'
						options={options!}
						{...props}
					/>
				)}
			/>
		</CoreForm.Section>
	);
};

export default Header;
