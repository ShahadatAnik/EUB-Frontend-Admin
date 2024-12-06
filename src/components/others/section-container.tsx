import { cn } from '@/lib/utils';

interface ISectionContainerProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	buttons?: React.ReactNode[];
	selector?: React.ReactNode;
	contentClassName?: string;
}

const SectionContainer = ({
	title,
	children,
	className,
	buttons,
	selector,
	contentClassName,
}: ISectionContainerProps) => {
	return (
		<div className={cn('', className)}>
			<div className='flex items-center justify-between gap-2 rounded-t-md bg-primary px-4 py-3'>
				<div className='flex items-center gap-2'>
					<h3 className='text-2xl font-semibold capitalize leading-tight text-primary-foreground md:text-3xl'>
						{title}
					</h3>

					{buttons && buttons.length > 0 && (
						<div className='flex items-center gap-2'>{buttons.map((e) => e)}</div>
					)}
				</div>
				<div className='w-32'>{selector}</div>
			</div>
			<div className={cn('overflow-hidden rounded-md rounded-t-none border', contentClassName)}>{children}</div>
		</div>
	);
};

export default SectionContainer;
