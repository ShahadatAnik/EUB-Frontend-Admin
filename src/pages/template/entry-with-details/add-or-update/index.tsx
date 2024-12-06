import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useTest, useTestByUUID } from '../../_config/query';
import { ITest3, TEST_NULL_3, TEST_SCHEMA_3 } from '../../_config/schema';
import Header from './header';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams();
	const isUpdate = !!id;

	const { url: testUrl, updateData, postData, deleteData } = useTest(); // TODO: Update Query

	const { data, invalidateQuery: invalidateTestDetails } = useTestByUUID(id as string); // TODO: Update Query

	const form = useRHF(TEST_SCHEMA_3, TEST_NULL_3); // TODO: Update schema

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'employees', // TODO: Update field name
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: ITest3) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			// TODO: Update variable name ⬇️
			const test_data = {
				...values,
				updated_at: getDateTime(),
			};

			// TODO: Update variable name and url ⬇️
			const test_promise = await updateData.mutateAsync({
				url: `${testUrl}/${id}`,
				updatedData: test_data,
				isOnCloseNeeded: false,
			});

			// TODO: Update variable name ⬇️
			const employees_promise = values.employees.map((item) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						purchase_description_uuid: id,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/test/entry', // TODO: Update url
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/test/entry/${item.uuid}`, // TODO: Update url
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				// TODO: Update promises name ⬇️
				await Promise.all([test_promise, ...employees_promise])
					.then(() => form.reset(TEST_NULL_3)) // TODO: Update reset data
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						// navigate(`/test/type3/${id}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		/* -------------------------------------------------------------------------- */
		/*                                  ADD TEST                                  */
		/* -------------------------------------------------------------------------- */
		const new_test_uuid = nanoid(); // TODO: Update variable name
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create purchase description
		//TODO: Update variable name ⬇️
		const test_data = {
			...values,
			uuid: new_test_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent
		// TODO: Update field name (e.g. employees)
		if ('employees' in test_data) {
			delete (test_data as { employees?: any })['employees'];
		}

		// TODO: Update url and variable name ⬇️
		const test_promise = await postData.mutateAsync({
			url: testUrl,
			newData: test_data,
			isOnCloseNeeded: false,
		});

		// Create purchase entries
		// TODO: Update field name (e.g. employees) and variable name ⬇️
		const employees_entries = [...values.employees].map((item) => ({
			...item,
			test_uuid: new_test_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		// TODO: Update url and variable name ⬇️
		const employees_entries_promise = employees_entries.map((item) =>
			postData.mutateAsync({
				url: '/purchase/entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			// TODO: Update promises name ⬇️
			await Promise.all([test_promise, ...employees_entries_promise])
				.then(() => form.reset(TEST_NULL_3)) // TODO: Update reset data
				.then(() => {
					invalidateTestDetails(); // TODO: Update invalidate query
					navigate(`/test/type3`); // TODO: Update navigate url
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	const handleAdd = () => {
		// TODO: Update field names

		append({
			name: '',
			email: '',
			phone: '',
			designation: '',
			department: '',
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].id) {
			setDeleteItem({
				id: fields[index].id, // TODO: Update field id
				name: fields[index].name, // TODO: Update field name
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('employees')[index];
		append({
			name: field.name,
			email: field.email,
			phone: field.phone,
			designation: field.designation,
			department: field.department,
		});
	};

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Test' : 'Add Test'} // TODO: Update title
			form={form}
			onSubmit={onSubmit}
		>
			<Header />
			<CoreForm.DynamicFields
				title='Employees' // TODO: Update title
				form={form}
				fieldName='employees' // TODO: Update field name
				// TODO: Go to _generateFieldDefs.tsx and update field name
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/test/entry`, // TODO: Update url
						deleteData,
						onClose: () => {
							form.setValue(
								'employees', // TODO: Update field name
								form
									.getValues('employees') // TODO: Update field name
									.filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
