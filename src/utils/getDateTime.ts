import { format } from 'date-fns';

const getDateTime = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss');

export default getDateTime;
