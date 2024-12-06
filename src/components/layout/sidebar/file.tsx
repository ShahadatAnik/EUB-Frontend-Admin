import { IRoute } from '@/types';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import useLayout from '@/hooks/useLayout';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { matchUrl } from '@/utils';

const variants = {
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	initial: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const SidebarFile: React.FC<IRoute> = ({ path, name, page_type }) => {
	const { setSidebarOpen } = useLayout();
	const { pathname } = useLocation();

	return (
		<motion.li variants={variants} initial='initial' animate='animate'>
			<NavLink
				onClick={() => setSidebarOpen(false)}
				to={path!}
				className={({ isActive }) =>
					cn(
						'relative flex w-full justify-between gap-2 rounded-r-md border-l-[3px] border-none px-4 py-2 text-sm transition-colors duration-200',
						isActive || matchUrl(path!, pathname)
							? 'bg-gradient-to-r from-accent/10 to-accent/30 font-medium text-primary-foreground'
							: 'text-primary-foreground/70 hover:bg-secondary/20 hover:text-primary-foreground'
					)
				}
			>
				<span className='block w-full truncate'>{name}</span>

				{page_type?.type && (
					<Badge variant='accent' className='py-0.25 px-1.5'>
						{page_type.name}
					</Badge>
				)}

				{matchUrl(path!, pathname) ? (
					<motion.div className='absolute inset-0 h-full w-[3px] bg-accent' layoutId='active-sidebar-item' />
				) : null}
			</NavLink>
		</motion.li>
	);
};

export default SidebarFile;
