import { format } from 'date-fns';

const Body = ({ value, className = '' }: { value: string; className?: string }) => {
	return <span className={'text-[0.7rem] font-semibold capitalize text-primary ' + className}>{value}</span>;
};

interface IDateTimeProps {
	date: Date;
	isDate?: boolean;
	isTime?: boolean;
}

const DateTime: React.FC<IDateTimeProps> = ({ date, isDate = true, isTime = true }) => {
	if (!date) return null;

	const customizedDate = format(new Date(date), 'dd/MM/yy');
	const customizedTime = format(new Date(date), 'h:mm a');

	return (
		<div className='flex flex-col'>
			{isDate && <Body value={customizedDate} />}
			{isTime && <Body value={customizedTime} className='-mt-1 text-secondary' />}
		</div>
	);
};
export default DateTime;
