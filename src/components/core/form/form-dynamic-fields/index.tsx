import DynamicFieldContainer from './_components/container';
import DefaultDynamicFields from './_components/default';
import SpreadsheetDynamicFields from './_components/spreadsheet';
import { DynamicFieldsProps } from './types';

const FormDynamicFields = (props: DynamicFieldsProps) => {
	return (
		<DynamicFieldContainer title={props.title} extraHeader={props.extraHeader} handleAdd={props.handleAdd}>
			{props.viewAs === 'spreadsheet' ? (
				<SpreadsheetDynamicFields {...props} />
			) : (
				<DefaultDynamicFields {...props} />
			)}
		</DynamicFieldContainer>
	);
};

export default FormDynamicFields;
