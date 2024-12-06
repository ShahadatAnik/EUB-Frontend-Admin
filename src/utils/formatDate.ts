import { IStartEndDateProps } from '@/types';
import { format } from 'date-fns';

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:ss');

const formatDateTable = (date: Date | string) => format(new Date(date), 'dd/MM/yyyy');

const formatQueryDates = ({ start_date, end_date }: IStartEndDateProps) => ({
	start_date: start_date ? (format(start_date, 'yyyy-MM-dd') as string) : undefined,
	end_date: end_date ? (format(end_date, 'yyyy-MM-dd') as string) : undefined,
});

export { formatDate, formatDateTable, formatQueryDates };
