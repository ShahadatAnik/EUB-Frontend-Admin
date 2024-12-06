import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { testEntryColumns } from '../../_config/columns'; // TODO: update columns to match the data type
import { ITestDetails } from '../../_config/columns/columns.type'; // TODO: update data type

const EntryTable: React.FC<{ data: ITestDetails }> = ({ data }) => {
	const columns = testEntryColumns(); // TODO: update columns to match the data type

	return <DataTableEntry title='Entries' columns={columns} data={data.entries || []} />;
};

export default EntryTable;
