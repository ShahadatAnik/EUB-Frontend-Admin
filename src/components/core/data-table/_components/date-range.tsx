import { DateRangePicker } from '@/components/ui/date-range-picker';

import { TTableDateRange } from '../types';

const TableDateRange = ({ start_date, end_date, table, onUpdate, onClear, isClear }: TTableDateRange<any>) => {
	const column = table.getColumn('created_at');

	return (
		<DateRangePicker
			initialDateFrom={start_date}
			initialDateTo={end_date}
			align={'center'}
			onUpdate={({ range }) => {
				if (!onUpdate) {
					column?.setFilterValue((old: [Date, Date]) => [
						new Date(range.from),
						range.to ? new Date(range.to) : old[1],
					]);

					return;
				}
				onUpdate({ range });
			}}
			onClear={!isClear && onUpdate && onClear ? onClear : undefined}
		/>
	);
};

export default TableDateRange;
