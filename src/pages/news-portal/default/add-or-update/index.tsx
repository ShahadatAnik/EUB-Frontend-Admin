import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useNewsPortal, useNewsPortalByUUID } from '../../_config/query';
import { INews_Portal, NEWS_PORTAL_NULL, NEWS_PORTAL_SCHEMA } from '../../_config/schema';
import Header from './header';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams();
	const isUpdate = !!id;

	const { url: newsPortalUrl, updateData, postData, deleteData } = useNewsPortal();

	const { data, invalidateQuery: invalidateNewsPortalDetails } = useNewsPortalByUUID(id as string);

	const form = useRHF(NEWS_PORTAL_SCHEMA, NEWS_PORTAL_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'documents',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: INews_Portal) {
		/* -------------------------------------------------------------------------- */
		/*                             UPDATE NEWS PORTAL                             */
		/* -------------------------------------------------------------------------- */
		if (isUpdate) {
			const data = {
				...values,
				updated_at: getDateTime(),
			};

			// const news_promise = await updateData.mutateAsync({
			// 	url: `${newsPortalUrl}/${id}`,
			// 	updatedData: data,
			// 	isOnCloseNeeded: false,
			// });

			// const documents_promise = values.documents.map((item) => {
			// 	if (item instanceof FileList) {
			// 		const newData = {
			// 			...item,
			// 			purchase_description_uuid: id,
			// 			created_at: getDateTime(),
			// 			created_by: user?.uuid,
			// 			uuid: nanoid(),
			// 		};

			// 		return postData.mutateAsync({
			// 			url: '/test/entry', // TODO: Update url
			// 			newData: newData,
			// 			isOnCloseNeeded: false,
			// 		});
			// 	} else {
			// 		const updatedData = {
			// 			...item,
			// 			updated_at: getDateTime(),
			// 		};
			// 		return updateData.mutateAsync({
			// 			url: `/test/entry/${item.uuid}`, // TODO: Update url
			// 			updatedData,
			// 			isOnCloseNeeded: false,
			// 		});
			// 	}
			// });

			// try {
			// 	await Promise.all([news_promise, ...documents_promise])
			// 		.then(() => form.reset(NEWS_PORTAL_NULL))
			// 		.then(() => {
			// 			invalidateNewsPortalDetails();
			// 			// navigate(`/test/type3/${id}`);
			// 		});
			// } catch (err) {
			// 	console.error(`Error with Promise.all: ${err}`);
			// }

			return;
		}

		/* -------------------------------------------------------------------------- */
		/*                               ADD NEWS PORTAL                              */
		/* -------------------------------------------------------------------------- */
		const new_news_portal_uuid = nanoid();
		const created_at = getDateTime();
		const created_by = user?.uuid;

		// Create news
		const data = {
			...values,
			uuid: new_news_portal_uuid,
			created_at,
			created_by,
		};

		// delete purchase field from data to be sent
		if ('documents' in data) {
			delete (data as { documents?: any })['documents'];
		}

		const news_promise = await postData.mutateAsync({
			url: newsPortalUrl,
			newData: data,
			isOnCloseNeeded: false,
		});

		// Create document entries
		const documents_entries = [...values.documents].map((item) => ({
			documents: item,
			news_portal_uuid: new_news_portal_uuid,
			uuid: nanoid(),
			created_at,
			created_by,
		}));

		const documents_promise = documents_entries.map((item) =>
			postData.mutateAsync({
				url: '/news/documents-entry',
				newData: item,
				isOnCloseNeeded: false,
			})
		);

		try {
			await Promise.all([news_promise, ...documents_promise])
				.then(() => form.reset(NEWS_PORTAL_NULL))
				.then(() => {
					invalidateNewsPortalDetails();
					navigate(`/news-portal`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	}

	// const handleAdd = () => {
	// 	append({
	// 		name: '',
	// 		email: '',
	// 		phone: '',
	// 		designation: '',
	// 		department: '',
	// 	});
	// };

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].id) {
			setDeleteItem({
				id: fields[index].id, // TODO: Update field id
				name: fields[index].id, // TODO: Update field name
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	// const handleCopy = (index: number) => {
	// 	// TODO: Update fields ⬇️
	// 	const field = form.watch('employees')[index];
	// 	append({
	// 		name: field.name,
	// 		email: field.email,
	// 		phone: field.phone,
	// 		designation: field.designation,
	// 		department: field.department,
	// 	});
	// };

	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit News' : 'Add News'} // TODO: Update title
			form={form}
			onSubmit={onSubmit}
		>
			<Header />

			{/* <Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/test/entry`, // TODO: Update url
						deleteData,
						onClose: () => {
							form.setValue(
								'documents', // TODO: Update field name
								form
									.getValues('documents') // TODO: Update field name
									.filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense> */}
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;
