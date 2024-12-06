import { Row } from '@tanstack/react-table';

export const dateRange = <TData>(row: Row<TData>, columnId: string, value: [Date, Date]): boolean => {
	const date = new Date(row.getValue(columnId));

	if (!(date instanceof Date)) {
		console.error(`Value of column "${columnId}" is expected to be a date, but got ${date}`);
		return false;
	}

	const [start, end] = value ?? []; // value => two date input values
	if (!(start instanceof Date || start === undefined) || !(end instanceof Date || end === undefined)) {
		console.error(`Filter value of column "${columnId}" is expected to be an array of two dates, but got ${value}`);
		return false;
	}

	// If one filter defined and date is undefined, filter it
	if ((start || end) && !date) {
		return false;
	}

	if (start && !end) {
		return date.getTime() >= start.getTime();
	} else if (!start && end) {
		return date.getTime() <= end.getTime();
	} else if (start && end) {
		return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
	}

	return true;
};
