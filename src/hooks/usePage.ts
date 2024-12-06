import { useContext } from 'react';
import { PageContext } from '@/context/PageContext';

const usePage = () => {
	const context = useContext(PageContext);

	if (!context) {
		throw new Error('usePage must be used within an PageProvider');
	}

	return context;
};

export default usePage;
