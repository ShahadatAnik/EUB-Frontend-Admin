import { cn } from '@/lib/utils';

interface TableTitleProps {
	title: string;
	subtitle?: string;
	titleClassName?: string;
	subtitleClassName?: string;
}

const TableTitle: React.FC<TableTitleProps> = ({ title, subtitle, titleClassName, subtitleClassName }) => {
	return (
		<div className='flex items-start justify-between gap-2 md:justify-start'>
			<div className='flex flex-col'>
				<h1
					className={cn(
						'text-xl font-semibold capitalize leading-tight text-primary md:text-2xl',
						titleClassName
					)}
				>
					{title}
				</h1>
				{subtitle && (
					<p className={cn('mt-0.5 text-sm capitalize text-secondary', subtitleClassName)}>{subtitle}</p>
				)}
			</div>
		</div>
	);
};

export default TableTitle;
