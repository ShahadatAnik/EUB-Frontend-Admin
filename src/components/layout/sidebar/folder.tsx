import { useEffect, useMemo, useState } from 'react';
import { IRoute } from '@/types';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSidebar from '@/hooks/useSidebar';

import { cn } from '@/lib/utils';
import { confirmRouteMatch } from '@/utils';

import SidebarFile from './file';

//* Animation definitions for the sidebar folder
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

//* Animation definitions for the folder's children
const childVariants = {
	open: {
		y: 0,
		opacity: 1,
		height: 'auto',
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 10,
		opacity: 0,
		height: 0 + 'px',
		overflow: 'hidden',
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const SidebarFolder: React.FC<IRoute> = (props) => {
	//* Destructure props
	const { path, name, children, disableCollapse } = props;

	const {
		path: { pathname },
		isCloseAll,
		setIsCloseAll,
	} = useSidebar();

	//* State for folder openness
	const [isOpen, setIsOpen] = useState(false);

	//* Check if the current route matches the folder's path
	const routeMatch = useMemo(() => confirmRouteMatch(props, pathname), [props, pathname]);

	//* Update folder state based on route match and close-all state
	useEffect(() => {
		if (routeMatch === true && !isCloseAll) {
			setIsOpen(true);
		}

		if (isCloseAll) {
			setIsOpen(false);
		}
	}, [path, isCloseAll, routeMatch]);

	//* If the folder is disabled from collapsing, render the file component
	if (disableCollapse) {
		return <SidebarFile path={path} name={name} />;
	}

	//* Determine the folder's class based on its state
	const folderClassName = cn(
		'group relative z-10 flex w-full items-center justify-between gap-2 rounded-none rounded-r-md border-l-[3px] px-4 py-2 text-sm text-primary-foreground',
		isOpen && !isCloseAll
			? 'border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10 text-primary-foreground'
			: 'border-transparent text-primary-foreground/70 hover:bg-secondary/20 hover:text-primary-foreground'
	);

	//* Handle folder click
	const handleClick = () => {
		setIsOpen((prev) => !prev);
		setIsCloseAll(false);
	};

	return (
		<motion.li variants={variants} initial='initial' animate='animate' className={''}>
			{/* Render the folder link if it has a path */}
			{path && (
				<Link key={name} onClick={handleClick} className={folderClassName} to={path}>
					<span className='truncate'>{name}</span>
					<ChevronRight
						className={cn(
							'size-5 transform duration-300 ease-in-out group-hover:scale-110',
							isOpen && !isCloseAll && 'rotate-90'
						)}
					/>
				</Link>
			)}

			{/* Render a button if the folder doesn't have a path */}
			{!path && (
				<motion.button whileTap={{ scale: 0.95 }} key={name} onClick={handleClick} className={folderClassName}>
					<span className='truncate'>{name}</span>
					<ChevronRight
						className={cn(
							'size-5 transform duration-300 ease-in-out group-hover:scale-110',
							isOpen && !isCloseAll && 'rotate-90'
						)}
					/>
				</motion.button>
			)}

			{/* Render children if the folder is open */}
			<motion.div variants={childVariants} animate={isOpen ? 'open' : 'closed'} className='pl-3'>
				<ul className='space-y-1 border-l border-accent/10 pt-1'>
					{children?.map((child: any, index: number) => {
						if (child?.children) {
							return <SidebarFolder key={index} {...child} />;
						} else {
							return <SidebarFile key={index} {...child} />;
						}
					})}
				</ul>
			</motion.div>
		</motion.li>
	);
};

export default SidebarFolder;
