import { Column } from '@tanstack/react-table';

import DateFilter from './date';
import NumberFilter from './number';
import SelectFilter from './select';
import StringFilter from './string';

// Define the props interface for the component
interface TableColumnFilterProps<T> {
	column: Column<T, unknown>;
	showLabel?: boolean;
}

// Define the component as a generic function to improve type inference
function TableColumnFilter<T>({ column, showLabel = false }: TableColumnFilterProps<T>) {
	const filterVariant = column.columnDef.meta?.filterVariant;

	// Render the appropriate filter component based on the filter variant
	const renderFilter = () => {
		switch (filterVariant) {
			case 'range':
				return <NumberFilter column={column} showLabel={showLabel} />;
			case 'select':
				return <SelectFilter column={column} showLabel={showLabel} />;
			case 'dateRange':
				return <DateFilter column={column} showLabel={showLabel} />;
			case 'text':
				return <StringFilter column={column} showLabel={showLabel} />;
			default:
				return <StringFilter column={column} showLabel={showLabel} />;
		}
	};

	return renderFilter();
}

export default TableColumnFilter;
