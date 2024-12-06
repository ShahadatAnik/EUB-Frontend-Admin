import { format } from 'date-fns';
import { FileSpreadsheet } from 'lucide-react';
import { CSVLink } from 'react-csv';
import useTable from '@/hooks/useTable';

import { buttonVariants } from '@/components/ui/button';

import { getFlatHeader } from '@/utils';

import { TTableExportCSV } from '../types';

const TableExportCSV = ({ start_date, end_date }: TTableExportCSV) => {
	const { table, title, isEntry } = useTable();

	const filteredRows = table._getFilteredRowModel?.().rows || [];

	const filteredCsvColumn = table
		.getAllLeafColumns()
		.filter(({ getIsVisible, id }) => id !== 'row-selection' && id !== 'actions' && getIsVisible());

	const { csvHeaders, csvHeadersId } = filteredCsvColumn.reduce(
		(acc, column: any) => {
			acc.csvHeaders.push(getFlatHeader(column.columnDef.header) as never);
			acc.csvHeadersId.push(column.id as never);
			return acc;
		},
		{ csvHeaders: [], csvHeadersId: [] }
	);

	const csvData = [csvHeaders, ...filteredRows.map((row) => csvHeadersId.map((column) => row.original[column]))];

	const startTime = format(start_date as Date, 'dd-MM-yyyy');
	const endTime = format(end_date as Date, 'dd-MM-yyyy');
	const filename = `${title.toLowerCase()} - ${startTime} to ${endTime}.csv`;

	return (
		<CSVLink
			aria-label='Export to CSV'
			role='button'
			type='button'
			className={buttonVariants({
				variant: isEntry ? 'gradient-accent' : 'secondary',
				size: 'sm',
				className: 'h-7',
			})}
			data={csvData}
			filename={filename}
		>
			<FileSpreadsheet className='size-4' />
			<span className='hidden lg:block'>Excel</span>
		</CSVLink>
	);
};

export default TableExportCSV;
