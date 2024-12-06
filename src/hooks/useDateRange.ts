import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

function useDateRange() {
	const [isClear, setIsClear] = useState(false);
	const initialEndDate = new Date();
	const initialStartDate = addDays(initialEndDate || new Date(), -89);

	const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate);
	const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

	useEffect(() => {
		startDate?.setHours(0, 0, 0, 0);
		endDate?.setHours(23, 59, 59, 999);
	}, [startDate, endDate]);

	const onUpdate = ({ range }: { range: DateRange }) => {
		setIsClear(false);
		setStartDate(range?.from || new Date());
		setEndDate(range?.to || new Date());
	};

	const onClear = () => {
		setStartDate(undefined);
		setEndDate(undefined);
		setIsClear(true);
	};

	return {
		start_date: startDate,
		end_date: endDate,
		onUpdate,
		onClear,
		isClear,
	};
}

export default useDateRange;
