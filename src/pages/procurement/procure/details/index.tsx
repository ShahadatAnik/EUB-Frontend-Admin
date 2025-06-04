import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICapitalTableData } from '../config/columns/columns.type';
import { useCapitalDetails } from '../config/query';
import Information from './information';
import Table from './table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useCapitalDetails(uuid as string);

	useEffect(() => {
		document.title = 'Capital Details (Capital)';
	}, []);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='space-y-8'>
			<Information data={(data || []) as ICapitalTableData} />
			<Table data={(data || []) as ICapitalTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;
