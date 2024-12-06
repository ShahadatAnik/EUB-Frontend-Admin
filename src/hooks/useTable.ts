import { useContext } from 'react';
import { TableContext } from '@/context/TableContext';

const useTable = () => {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error('useTable must be used within an TableProvider');
	}

	return context;
};

export default useTable;
