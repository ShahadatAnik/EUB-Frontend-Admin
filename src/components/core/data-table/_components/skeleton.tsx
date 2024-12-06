import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

interface ITableSkeletonProps {
	colSpan: number;
}

const TableSkeleton: React.FC<ITableSkeletonProps> = ({ colSpan }) => {
	return Array.from({ length: 10 }).map((_, index) => (
		<TableRow key={index}>
			{Array.from({ length: colSpan }).map((_, i) => (
				<TableCell key={i}>
					<Skeleton className='h-6 w-full rounded-md bg-base-300' />
				</TableCell>
			))}
		</TableRow>
	));
};

export default TableSkeleton;
