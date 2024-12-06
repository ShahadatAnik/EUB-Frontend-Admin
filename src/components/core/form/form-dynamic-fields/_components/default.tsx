import React from 'react';

import { FormField } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CoreForm from '@core/form';

import { cn } from '@/lib/utils';

import { DynamicFieldsProps } from '../../form-dynamic-fields/types';

const DefaultDynamicFields: React.FC<Omit<DynamicFieldsProps, 'title' | 'viewAs' | 'extraButtons' | 'handleAdd'>> = ({
	fields,
	fieldName,
	fieldDefs,
	form,
}) => {
	return (
		<div className='rounded-b-md border border-t-0'>
			<Table className='overflow-x-auto'>
				<TableHeader>
					<TableRow className='h-8 divide-x-[1px]'>
						{fieldDefs
							.filter((field) => !field.hidden)
							.map((field) => field.header)
							.map((header) => (
								<TableHead key={header}>{header}</TableHead>
							))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{fields.length === 0 && (
						<TableRow>
							<TableCell className='text-center' colSpan={fieldDefs.length}>
								<p className='text-destructive'>No fields added yet</p>
							</TableCell>
						</TableRow>
					)}
					{fields.length > 0 &&
						fields.map((field, fieldIndex) => (
							<TableRow key={field.id} className='divide-x-[1px] hover:bg-base-150'>
								{fieldDefs
									.filter((fieldDef) => !fieldDef.hidden)
									.map((fieldDef) => {
										if (fieldDef.isLoading) {
											return (
												<TableCell className={cn('first:pl-2 last:pr-2', fieldDef.className)}>
													<Skeleton className='h-8 w-full bg-secondary/10' />
												</TableCell>
											);
										} else {
											return (
												<TableCell
													className={cn('first:pl-2 last:pr-2', fieldDef.className)}
													key={fieldDef.accessorKey}
												>
													{fieldDef.type === 'readOnly' &&
														field[fieldDef.accessorKey as keyof typeof field]}

													{fieldDef.type === 'custom' && fieldDef.component(fieldIndex)}

													{fieldDef.type === 'join-input-unit' && (
														<FormField
															control={form.control}
															name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
															render={(props) => (
																<CoreForm.JoinInputUnit
																	unit={fieldDef.unit(fieldIndex)}
																	disableLabel
																	type={fieldDef.inputType}
																	{...props}
																/>
															)}
														/>
													)}

													{fieldDef.type === 'text' && (
														<FormField
															control={form.control}
															name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
															render={(props) => (
																<CoreForm.Input
																	type={'text'}
																	disableLabel
																	placeholder={fieldDef.placeholder}
																	{...props}
																/>
															)}
														/>
													)}

													{fieldDef.type === 'number' && (
														<FormField
															control={form.control}
															name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
															render={(props) => (
																<CoreForm.Input
																	type='number'
																	disableLabel
																	placeholder={fieldDef.placeholder}
																	{...props}
																/>
															)}
														/>
													)}

													{fieldDef.type === 'select' && (
														<FormField
															control={form.control}
															name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
															render={(props) => (
																<CoreForm.ReactSelect
																	menuPortalTarget={document.body}
																	options={fieldDef.options}
																	placeholder={fieldDef.placeholder}
																	disableLabel
																	{...props}
																/>
															)}
														/>
													)}
												</TableCell>
											);
										}
									})}
							</TableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
};

export default DefaultDynamicFields;
