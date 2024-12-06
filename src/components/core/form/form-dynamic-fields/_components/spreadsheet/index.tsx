import { HotColumn, HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

import { DynamicFieldsProps } from '@core/form/form-dynamic-fields/types';

import CustomEditor from './custom-editor';
import CustomRenderer from './custom-renderer';

registerAllModules();

const SpreadsheetDynamicFields: React.FC<
	Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>
> = ({ fieldDefs, fieldName, form }) => {
	const columnHeaders = fieldDefs.filter((field) => !field.hidden).map((field) => field.header);

	const data = form.watch(fieldName)?.map((field: Record<string, string>) => {
		const fields = fieldDefs
			.filter((field) => field.accessorKey !== 'actions' && !field.hidden)
			.map((field) => field.accessorKey);

		return fields.reduce((obj: any, key) => {
			obj[key] = field[key];
			return obj;
		}, {});
	});

	data.forEach((item: any, index: number) => {
		Object.keys(item).forEach((key) => {
			form.register(`${fieldName}.${index}.${key}`);
		});
	});

	return (
		<div className='overflow-auto rounded-b-md border border-y-0'>
			<HotTable
				layoutDirection='ltr'
				data={data}
				rowHeaders={false}
				colHeaders={columnHeaders}
				height='auto'
				width='100%'
				stretchH='all'
				autoWrapRow={true}
				autoWrapCol={true}
				autoColumnSize={false}
				autoRowSize={false}
				customBorders={true}
				headerClassName='h-8 flex items-center whitespace-nowrap !px-3 text-left align-middle text-sm font-medium tracking-wide text-primary first:pl-6 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0 bg-base-200'
				afterChange={(changes) => {
					changes?.forEach(([row, prop, oldValue, newValue]) => {
						const field = fieldDefs.find((field) => field.accessorKey === prop);
						form.setValue(`${fieldName}.${row}.${prop}`, field?.type === 'number' ? +newValue : newValue, {
							shouldDirty: true,
							shouldTouch: true,
							shouldValidate: true,
						});
					});
				}}
				licenseKey='non-commercial-and-evaluation' // for non-commercial use only
			>
				{fieldDefs
					.filter((field) => !field.hidden)
					.map((field) => {
						// if (field.type === 'text' || field.type === 'number') {
						// 	return (
						// 		<HotColumn
						// 			className={'sb-blue'}
						// 			key={field.accessorKey}
						// 			data={field.accessorKey}>
						// 			<CustomRenderer
						// 				hot-renderer
						// 				field={field}
						// 				fieldName={fieldName}
						// 			/>
						// 		</HotColumn>
						// 	);
						// }

						if (field.type === 'readOnly') {
							return <HotColumn key={field.accessorKey} data={field.accessorKey} />;
						}

						return (
							<HotColumn
								key={field.accessorKey}
								data={field.accessorKey}
								readOnly={field.type === 'custom'}
							>
								<CustomEditor hot-editor field={field} />
								<CustomRenderer hot-renderer field={field} fieldName={fieldName} />
							</HotColumn>
						);
					})}
			</HotTable>
		</div>
	);
};

export default SpreadsheetDynamicFields;
