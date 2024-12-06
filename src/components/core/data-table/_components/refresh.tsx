import { useState } from 'react';
import { IResponse } from '@/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import TooltipWrapper from '@/components/others/tooltip-wrapper';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

interface TableRefreshProps {
	handleRefetch: (options?: RefetchOptions) => Promise<QueryObserverResult<IResponse<unknown>, Error>>;
}
const TableRefresh: React.FC<TableRefreshProps> = ({ handleRefetch }) => {
	const [isFetching, setIsFetching] = useState(false);

	const handleClick = async () => {
		setIsFetching(true);

		try {
			const result = await handleRefetch();

			if (result.error?.message) {
				throw new Error(result.error?.message);
			}
			toast.success('Data refreshed successfully');
		} catch (error: any) {
			toast.error(error?.message as string);
		} finally {
			setIsFetching(false);
		}
	};
	return (
		<TooltipWrapper message='Refresh data'>
			<Button
				aria-label='Refresh Data'
				disabled={isFetching}
				variant={'gradient'}
				size={'sm'}
				onClick={handleClick}
			>
				<RefreshCw className={cn('size-4', isFetching && 'animate-spin')} />
				Refresh
			</Button>
		</TooltipWrapper>
	);
};

export default TableRefresh;
