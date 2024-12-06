import * as React from 'react';
import { IToolbarOptions } from '@/types';
import { Column, ColumnDef, Table } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';

interface TStartEndDate {
	start_date: Date | string | undefined;
	end_date: Date | string | undefined;
}

export type TTableExportCSV = TStartEndDate;

export type TTableDateRange<T> = TStartEndDate & {
	table: Table<T>;
	onUpdate: (({ range }: { range: DateRange }) => void) | undefined;
	onClear?: () => void;
	isClear?: boolean;
};

export interface IDataTableEntryProps<TData, TValue> {
	title: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	toolbarOptions?: 'none' | IToolbarOptions[];
}

interface TDefaultColumn<TData, TValue> {
	column: Column<TData, TValue>;
}

export interface TableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
}

export type IFilterProps<TData, TValue> = TDefaultColumn<TData, TValue> & {
	showLabel?: boolean;
};

export interface TableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}
