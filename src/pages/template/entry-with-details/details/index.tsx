import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ITestDetails } from '../../_config/columns/columns.type'; // TODO: replace with details data type
import { useTestDetailsByUUID } from '../../_config/query'; // TODO: replace with details query
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading } = useTestDetailsByUUID<ITestDetails>(id as string); // TODO: update query and data type

	useEffect(() => {
		document.title = 'Test Details'; // TODO: update page title
	}, []);

	if (isLoading) return <div>Loading...</div>;

	// TODO: remove fake data
	const fakeData: ITestDetails = {
		uuid: '1',
		name: 'Test',
		stock: '100',
		created_at: '2024-02-20 10:00:00',
		updated_at: '2024-02-20 10:00:00',
		remarks: 'Test',
		entries: [
			{
				uuid: '1',
				name: 'Test',
				stock: '100',
				created_at: '2024-02-20 10:00:00',
				updated_at: '2024-02-20 10:00:00',
				remarks: 'Test',
			},
		],
	};

	return (
		<div className='space-y-8'>
			{/* TODO: remove fake data and update data type ⬇️ */}
			<Information data={(data || fakeData) as ITestDetails} />
			<EntryTable data={(data || fakeData) as ITestDetails} />
		</div>
	);
};

export default DetailsPage;
