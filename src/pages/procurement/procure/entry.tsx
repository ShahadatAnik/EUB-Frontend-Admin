import { watch } from 'fs';
import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { array } from 'zod';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherSubCategory, useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { ICapitalTableData } from './config/columns/columns.type';
import { useCapital, useCapitalDetails } from './config/query';
import { CAPITAL_NULL, CAPITAL_SCHEMA, ICapital } from './config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import useGenerateGeneralNotes from './useGenerateGeneralNotes';
import useGenerateItemWorkOrder from './useGenerateItemWorkOrder';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const [subCategory, setSubCategory] = useState<string | null>(null);
	const [min, setMin] = useState<{ min_amount: number; min_quotation: number }>({
		min_amount: 0,
		min_quotation: 0,
	});

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		imagePostData,
		imageUpdateData,
		invalidateQuery: invalidateCapitalDetails,
	} = useCapitalDetails<ICapitalTableData>(uuid as string);

	const { invalidateQuery } = useCapital<ICapitalTableData[]>();
	const { data: subCategoryList } = useOtherSubCategory<IFormSelectOption[]>();
	const { data: vendorList } = useOtherVendor<IFormSelectOption[]>();

	const form = useRHF(CAPITAL_SCHEMA, CAPITAL_NULL);

	const {
		fields: quotationFields,
		append: appendQuotation,
		remove: removeQuotation,
	} = useFieldArray({
		control: form.control,
		name: 'quotations',
	});

	const {
		fields: itemsFields,
		append: appendItems,
		remove: removeItems,
	} = useFieldArray({
		control: form.control,
		name: 'items',
	});

	const {
		fields: generalNotesFields,
		append: appendGeneralNotes,
		remove: removeGeneralNotes,
	} = useFieldArray({
		control: form.control,
		name: 'general_notes',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			// Reset form values
			form.reset(data);

			// Set subCategory
			setSubCategory(
				(subCategoryList?.find((item) => item.value === data.sub_category_uuid)?.label as string) || null
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: ICapital) {
		const { quotations, general_notes, items, ...rest } = values;

		const formData = Formdata(rest);

		// Remove fields with null value from formData
		const formFields = [
			'quotation_file',
			'work_order_file',
			'delivery_statement_file',

			'done_date',
			'quotation_date',
			'cs_date',
			'monthly_meeting_date',
			'work_order_date',
			'delivery_statement_date',
			'monthly_meeting_schedule_date',

			'cs_remarks',
			'monthly_meeting_remarks',
			'work_order_remarks',
			'vendor_uuid',
			'delivery_statement_remarks',
		];
		formFields.forEach((field) => {
			if (values[field as keyof typeof values] == null) {
				formData.delete(field);
			}
		});

		// * Filtered entries
		const filteredItems = items.filter((entry) => (entry.quantity ?? 0) > 0 && entry.item_uuid);

		if (subCategory === 'Items' && filteredItems.length === 0) {
			toast.warning('please add at least one item entry');
			return;
		}

		if (min.min_quotation > 0 && quotations.length < min.min_quotation) {
			toast.warning(`Please add at least ${min.min_quotation} quotation entries`);
			return;
		}

		if (min.min_amount > 0 && quotations.reduce((acc, curr) => acc + curr.amount, 0) < min.min_amount) {
			toast.warning(`Please add at least total of ${min.min_amount} quotation amount`);
			return;
		}

		if (isUpdate) {
			// UPDATE ITEM
			formData.append('updated_at', getDateTime());

			imageUpdateData
				.mutateAsync({
					url: `/procure/capital/${uuid}`,
					updatedData: formData,
				})
				.then(() => {
					// * UPDATE FOR QUOTATIONS
					if (quotations.length > 0) {
						const quotationsUpdatePromise = quotations.map((entry) => {
							const formData = Formdata(entry);

							// Remove fields with null value from generalNotesFormData
							const fields = ['quotation_file', 'amount'];
							fields.forEach((field) => {
								if (
									entry[field as keyof typeof entry] == null ||
									entry[field as keyof typeof entry] === 0
								) {
									formData.delete(field);
								}
							});

							if (entry.uuid) {
								formData.append('updated_at', getDateTime());

								return imageUpdateData.mutateAsync({
									url: `/procure/capital-vendor/${entry.uuid}`,
									updatedData: formData,
								});
							} else {
								formData.append('capital_uuid', uuid);
								formData.append('created_at', getDateTime());
								formData.append('created_by', user?.uuid || '');
								formData.append('uuid', nanoid());

								return imagePostData.mutateAsync({
									url: `/procure/capital-vendor`,
									newData: formData,
								});
							}
						});

						Promise.all([...quotationsUpdatePromise]);
					}

					// * UPDATE FOR ITEMS
					if (filteredItems.length > 0) {
						const itemsPromise = filteredItems.map((entry) => {
							if (entry.uuid) {
								const entryUpdateData = {
									...entry,
									received_date: entry.is_received ? getDateTime() : null,
									updated_at: getDateTime(),
								};
								return updateData.mutateAsync({
									url: `/procure/item-work-order-entry/${entry.uuid}`,
									updatedData: entryUpdateData,
								});
							} else {
								const entryData = {
									...entry,
									received_date: entry.is_received ? getDateTime() : null,
									capital_uuid: uuid,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
								};
								return postData.mutateAsync({
									url: `/procure/item-work-order-entry`,
									newData: entryData,
								});
							}
						});
						Promise.all([...itemsPromise]);
					}

					// * UPDATE FOR GENERAL NOTES
					if (general_notes.length > 0) {
						const generalNotesUpdatePromise = general_notes.map((entry) => {
							const formData = Formdata(entry);

							// Remove fields with null value from generalNotesFormData
							const fields = ['general_note_file', 'amount'];
							fields.forEach((field) => {
								if (
									entry[field as keyof typeof entry] == null ||
									entry[field as keyof typeof entry] === 0
								) {
									formData.delete(field);
								}
							});

							if (entry.uuid) {
								formData.append('updated_at', getDateTime());
								return imageUpdateData.mutateAsync({
									url: `/procure/general-note/${entry.uuid}`,
									updatedData: formData,
								});
							} else {
								formData.append('capital_uuid', uuid);
								formData.append('created_at', getDateTime());
								formData.append('created_by', user?.uuid || '');
								formData.append('uuid', nanoid());

								return imagePostData.mutateAsync({
									url: `/procure/general-note`,
									newData: formData,
								});
							}
						});
						Promise.all([...generalNotesUpdatePromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateCapitalDetails();
					navigate('/procurement/procure-capital');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const new_uuid = nanoid();

			formData.append('created_at', getDateTime());
			formData.append('created_by', user?.uuid || '');
			formData.append('uuid', new_uuid);

			imagePostData
				.mutateAsync({
					url: '/procure/capital',
					newData: formData,
				})
				.then(() => {
					// * ENTRY FOR QUOTATIONS

					if (quotations.length > 0) {
						const quotationsPromise = quotations.map((entry) => {
							const formData = Formdata(entry);

							// Remove fields with null value from generalNotesFormData
							const fields = ['quotation_file', 'amount'];
							fields.forEach((field) => {
								if (
									entry[field as keyof typeof entry] == null ||
									entry[field as keyof typeof entry] === 0
								) {
									formData.delete(field);
								}
							});

							formData.append('capital_uuid', new_uuid);
							formData.append('created_at', getDateTime());
							formData.append('created_by', user?.uuid || '');
							formData.append('uuid', nanoid());

							return imagePostData.mutateAsync({
								url: `/procure/capital-vendor`,
								newData: formData,
							});
						});
						Promise.all([...quotationsPromise]);
					}

					// * ENTRY FOR ITEMS
					if (filteredItems.length > 0) {
						const itemsPromise = filteredItems.map((entry) => {
							const entryData = {
								...entry,
								received_date: entry.is_received ? getDateTime() : null,
								capital_uuid: new_uuid,
								created_at: getDateTime(),
								created_by: user?.uuid,
								uuid: nanoid(),
							};
							return postData.mutateAsync({
								url: `/procure/item-work-order-entry`,
								newData: entryData,
							});
						});
						Promise.all([...itemsPromise]);
					}

					// * ENTRY FOR GENERAL NOTES
					if (general_notes.length > 0) {
						const generalNotesPromise = general_notes.map((entry) => {
							const formData = Formdata(entry);

							// Remove fields with null value from generalNotesFormData
							const fields = ['general_note_file', 'amount'];
							fields.forEach((field) => {
								if (
									entry[field as keyof typeof entry] == null ||
									entry[field as keyof typeof entry] === 0
								) {
									formData.delete(field);
								}
							});

							formData.append('uuid', nanoid());
							formData.append('created_at', getDateTime());
							formData.append('created_by', user?.uuid || '');
							formData.append('capital_uuid', new_uuid);

							return imagePostData.mutateAsync({
								url: `/procure/general-note`,
								newData: formData,
							});
						});
						Promise.all([...generalNotesPromise]);
					}
				})
				.then(() => {
					invalidateQuery();
					invalidateCapitalDetails();
					navigate('/procurement/procure-capital');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	// ? Dynamic Form

	// * ADD QUOTATIONS
	const handleAddQuotations = () => {
		appendQuotation({
			vendor_uuid: '',
			amount: 0,
			is_selected: false,
			quotation_file: null,
		});
	};

	// * ADD ITEMS
	const handleAddItems = () => {
		appendItems({
			item_uuid: '',
			quantity: 0,
			is_received: false,
			received_date: null,
		});
	};

	// * ADD GENERAL NOTES
	const handleAddGeneralNotes = () => {
		appendGeneralNotes({
			description: '',
			amount: 0,
			general_note_file: null,
		});
	};

	// * DELETE
	const [deleteItem, setDeleteItem] = useState<{
		type?: string;
		id: string;
		name: string;
	} | null>(null);

	// * REMOVE QUOTATIONS
	const handleRemoveQuotations = (index: number) => {
		if (quotationFields[index].uuid) {
			setDeleteItem({
				type: 'quotations',
				id: quotationFields[index].uuid,
				name: quotationFields[index].id,
			});
		} else {
			removeQuotation(index);
		}
	};

	// * REMOVE ITEMS
	const handleRemoveItems = (index: number) => {
		if (itemsFields[index].uuid) {
			setDeleteItem({
				type: 'items',
				id: itemsFields[index].uuid,
				name: itemsFields[index].uuid,
			});
		} else {
			removeItems(index);
		}
	};

	// * REMOVE GENERAL NOTES
	const handleRemoveGeneralNotes = (index: number) => {
		if (generalNotesFields[index].uuid) {
			setDeleteItem({
				type: 'general_notes',
				id: generalNotesFields[index].uuid,
				name: generalNotesFields[index].id,
			});
		} else {
			removeGeneralNotes(index);
		}
	};

	// * COPY QUOTATIONS
	const handleCopyQuotations = (index: number) => {
		const field = form.watch('quotations')[index];
		appendQuotation({
			vendor_uuid: field.vendor_uuid,
			amount: field.amount,
			is_selected: field.is_selected,
			quotation_file: null,
		});
	};

	// * COPY ITEMS
	const handleCopyItems = (index: number) => {
		const field = form.watch('items')[index];
		appendItems({
			item_uuid: field.item_uuid,
			quantity: field.quantity,
			is_received: field.is_received,
			received_date: field.received_date,
		});
	};

	// * COPY GENERAL NOTES
	const handleCopyGeneralNotes = (index: number) => {
		const field = form.watch('general_notes')[index];
		appendGeneralNotes({
			amount: field.amount,
			description: field.description,
			general_note_file: null,
		});
	};

	const fieldDefsQuotations = useGenerateFieldDefs({
		data: form.getValues(),
		copy: handleCopyQuotations,
		remove: handleRemoveQuotations,
		isUpdate,
		watch: form.watch,
	});

	const fieldDefsItems = useGenerateItemWorkOrder({
		data: form.getValues(),
		copy: handleCopyItems,
		remove: handleRemoveItems,
		isUpdate,
		watch: form.watch,
		set: form.setValue,
		isNew: false,
		form: form,
	});

	useEffect(() => {
		if (min.min_quotation > 0) {
			form.setValue('quotations', []);
			const toAdd = min.min_quotation;
			if (toAdd > 0) {
				for (let i = 0; i < toAdd; i++) {
					handleAddQuotations();
				}
			}
		}
	}, [min]);

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Update Procure' : 'Add Procure'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title={`Request`}
				className='grid gap-4 lg:grid-cols-2'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='done_date'
							render={(props) => (
								<CoreForm.DatePicker disableLabel placeholder='Done Date' disabled {...props} />
							)}
						/>
						<FormField
							control={form.control}
							name='done'
							render={(props) => (
								<CoreForm.Switch
									labelClassName='text-slate-100'
									label='Paid'
									onCheckedChange={(e) => {
										if (e) {
											form.setValue('done_date', getDateTime());
										} else {
											form.setValue('done_date', '');
										}
									}}
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='sub_category_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Sub Segment'
							placeholder='Select sub category'
							menuPortalTarget={document.body}
							options={subCategoryList?.filter((item) => item.label !== 'Items') || []!}
							{...props}
							onChange={(option) => {
								setSubCategory(option?.label || null);
								setMin({
									min_amount: option?.min_amount || 0,
									min_quotation: option?.min_quotation || 0,
								});
								if (option?.label === 'Items') {
									form.setValue('is_quotation', true);
								} else {
									form.setValue('is_quotation', false);
								}
								// form.setValue('sub_category_uuid', option?.value || null);
							}}
						/>
					)}
				/>
			</CoreForm.Section>

			<CoreForm.DynamicFields
				title='Items'
				form={form}
				fieldName='items'
				fieldDefs={fieldDefsItems}
				fields={itemsFields}
				handleAdd={handleAddItems}
			/>

			<CoreForm.DynamicFields
				title='Quotations'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='quotation_date'
							render={(props) => (
								<CoreForm.DatePicker disableLabel placeholder='Quotation Date' disabled {...props} />
							)}
						/>
						<FormField
							control={form.control}
							name='is_quotation'
							render={(props) => (
								<CoreForm.Switch
									labelClassName='text-slate-100'
									onCheckedChange={(e) => {
										if (e) {
											form.setValue('quotation_date', getDateTime());
										} else {
											form.setValue('quotation_date', '');
										}
									}}
									{...props}
								/>
							)}
						/>
					</div>
				}
				form={form}
				fieldName='quotations'
				fieldDefs={fieldDefsQuotations}
				fields={quotationFields}
				{...(form.watch('is_quotation') ? { handleAdd: handleAddQuotations } : {})}
			/>

			<CoreForm.Section
				title={`Cs`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='cs_date'
							render={(props) => (
								<CoreForm.DatePicker disableLabel placeholder='Cs Date' disabled {...props} />
							)}
						/>

						<FormField
							control={form.control}
							name='is_cs'
							render={(props) => (
								<CoreForm.Switch
									label='Cs'
									labelClassName='text-slate-100'
									onCheckedChange={(e) => {
										if (e) {
											form.setValue('cs_date', getDateTime());
										} else {
											form.setValue('cs_date', '');
										}
									}}
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				{form.watch('is_cs') && (
					<FormField
						control={form.control}
						name='cs_remarks'
						render={(props) => (
							<CoreForm.Textarea
								label='Cs Remarks'
								disabled={!(form.watch('is_cs') && form.watch('is_quotation'))}
								{...props}
							/>
						)}
					/>
				)}
			</CoreForm.Section>

			<CoreForm.Section
				title={`Monthly Meeting`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='monthly_meeting_schedule_date'
							render={(props) => (
								<CoreForm.DatePicker
									disableLabel
									placeholder='Monthly Meeting Schedule'
									disabled={form.watch('is_monthly_meeting')}
									{...props}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='monthly_meeting_date'
							render={(props) => (
								<CoreForm.DatePicker
									disableLabel
									placeholder='Monthly Meeting Date'
									disabled
									{...props}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name='is_monthly_meeting'
							render={(props) => (
								<CoreForm.Switch
									label='Monthly Meeting'
									labelClassName='text-slate-100'
									onCheckedChange={(e) => {
										if (e) {
											form.setValue('monthly_meeting_date', getDateTime());
										} else {
											form.setValue('monthly_meeting_date', '');
										}
									}}
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				{form.watch('is_monthly_meeting') && (
					<FormField
						control={form.control}
						name='monthly_meeting_remarks'
						render={(props) => (
							<CoreForm.Textarea
								label='Monthly Meeting Remarks'
								disabled={
									!(
										form.watch('is_monthly_meeting') &&
										form.watch('is_cs') &&
										form.watch('is_quotation')
									)
								}
								{...props}
							/>
						)}
					/>
				)}
			</CoreForm.Section>

			<CoreForm.Section
				title={`Work Order`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='work_order_date'
							render={(props) => (
								<CoreForm.DatePicker disableLabel placeholder='Work Order Date' disabled {...props} />
							)}
						/>

						<FormField
							control={form.control}
							name='is_work_order'
							render={(props) => (
								<CoreForm.Switch
									label='Work Order'
									labelClassName='text-slate-100'
									{...props}
									onCheckedChange={(value) => {
										if (!value) {
											form.setValue(
												'items',
												form.getValues('items').map((item) => ({
													...item,
													is_received: false,
													received_date: null,
												}))
											);
											form.setValue('work_order_date', '');
										} else {
											form.setValue('work_order_date', getDateTime());
										}
									}}
								/>
							)}
						/>
					</div>
				}
			>
				{form.watch('is_work_order') && (
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-4'>
							{subCategory !== 'Items' && (
								<FormField
									control={form.control}
									name='vendor_uuid'
									render={(props) => (
										<CoreForm.ReactSelect
											label='Vendor'
											options={
												vendorList?.filter((item) =>
													form
														.getValues('quotations')
														.some((quotation) => quotation.vendor_uuid === item.value)
												) || []
											}
											isDisabled={
												!(
													form.watch('is_work_order') &&
													form.watch('is_monthly_meeting') &&
													form.watch('is_cs') &&
													form.watch('is_quotation')
												)
											}
											{...props}
										/>
									)}
								/>
							)}
							<FormField
								control={form.control}
								name='work_order_remarks'
								render={(props) => (
									<CoreForm.Textarea
										label='Work Order Remarks'
										disabled={
											!(
												form.watch('is_work_order') &&
												form.watch('is_monthly_meeting') &&
												form.watch('is_cs') &&
												form.watch('is_quotation')
											)
										}
										{...props}
									/>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='work_order_file'
							render={(props) => (
								<CoreForm.FileUpload
									label='File'
									fileType='document'
									errorText='File must be less than 10MB and of type pdf, doc, docx'
									isUpdate={isUpdate}
									options={{
										maxSize: 10000000,
									}}
									{...props}
								/>
							)}
						/>
					</div>
				)}
			</CoreForm.Section>

			<CoreForm.Section
				title={`Delivery Statement`}
				className='grid gap-4 lg:grid-cols-1'
				extraHeader={
					<div className='flex items-center justify-center gap-4'>
						<FormField
							control={form.control}
							name='delivery_statement_date'
							render={(props) => (
								<CoreForm.DatePicker
									disableLabel
									placeholder='Delivery Statement Date'
									disabled
									{...props}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name='is_delivery_statement'
							render={(props) => (
								<CoreForm.Switch
									label='Delivery Statement'
									labelClassName='text-slate-100'
									onCheckedChange={(e) => {
										if (e) {
											form.setValue('delivery_statement_date', getDateTime());
										} else {
											form.setValue('delivery_statement_date', '');
										}
									}}
									{...props}
								/>
							)}
						/>
					</div>
				}
			>
				{form.watch('is_delivery_statement') && (
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='delivery_statement_remarks'
							render={(props) => (
								<CoreForm.Textarea
									label='Delivery Statement Remarks'
									disabled={
										!(
											form.watch('is_delivery_statement') &&
											form.watch('is_work_order') &&
											form.watch('is_monthly_meeting') &&
											form.watch('is_cs') &&
											form.watch('is_quotation')
										)
									}
									{...props}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name='delivery_statement_file'
							render={(props) => (
								<CoreForm.FileUpload
									label='File'
									fileType='document'
									errorText='File must be less than 10MB and of type pdf, doc, docx'
									isUpdate={isUpdate}
									options={{
										maxSize: 10000000,
									}}
									{...props}
								/>
							)}
						/>
					</div>
				)}
			</CoreForm.Section>

			<CoreForm.DynamicFields
				title='General Notes'
				form={form}
				fieldName='general_notes'
				fieldDefs={useGenerateGeneralNotes({
					data: form.getValues(),
					copy: handleCopyGeneralNotes,
					remove: handleRemoveGeneralNotes,
					isUpdate,
					isNew: false,
				})}
				fields={generalNotesFields}
				handleAdd={handleAddGeneralNotes}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url:
							deleteItem?.type === 'quotations'
								? `/procure/capital-vendor`
								: deleteItem?.type === 'general_notes'
									? `/procure/general-note`
									: `/procure/item-work-order-entry`,
						deleteData,
						invalidateQuery: invalidateCapitalDetails,
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
