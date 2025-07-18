import { useEffect, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { format } from 'date-fns';

import { ToolbarComponent } from '@/components/core/data-table/_components/toolbar';
import { DateRangePicker } from '@/components/ui/date-range-picker';

import { PageInfo } from '@/utils';

import { reportItemColumns } from '../config/columns';
import { IReportItemTableData } from '../config/columns/columns.type';
import { useReportItem } from '../config/query';

const ReportItem = () => {
	const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
		from: format(new Date(), 'yyyy-MM-dd'),
		to: format(new Date(), 'yyyy-MM-dd'),
	});

	const { data, isLoading, url, refetch } = useReportItem<IReportItemTableData[]>(dateRange);

	useEffect(() => {
		refetch();
	}, [dateRange, refetch]);

	const pageInfo = useMemo(() => new PageInfo('Procurement/Item Report', url, 'portfolio__report_item'), [url]);

	// Table Columns
	const columns = reportItemColumns();
	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ created_at: false, created_by_name: false, updated_at: false, remarks: false }}
				toolbarOptions={['other', 'view', 'refresh', 'export-csv']}
				start_date={new Date(dateRange.from)}
				end_date={new Date(dateRange.to)}
				otherToolBarComponents={
					<ToolbarComponent
						option='other'
						render={() => (
							<DateRangePicker
								onUpdate={({ range }) => {
									setDateRange({
										from: format(range.from, 'yyyy-MM-dd'),
										to: range.to ? format(range.to, 'yyyy-MM-dd') : dateRange.to,
									});
								}}
							/>
						)}
					/>
				}
			/>
		</PageProvider>
	);
};

export default ReportItem;
