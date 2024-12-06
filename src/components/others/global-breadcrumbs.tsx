import { motion } from 'framer-motion';
import { House } from 'lucide-react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { cn } from '@/lib/utils';

const variants = {
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},

	initial: {
		x: -50,
		opacity: 0,
	},
};

const GlobalBreadcrumbs = () => {
	const breadcrumbs = useBreadcrumbs();

	const items = breadcrumbs.map((e) => {
		// const existedRoute = flatRoutes.find(
		// 	(route) => route.path === e.match?.pathname
		// );

		// if (existedRoute)
		// 	return {
		// 		label: existedRoute.name,
		// 		href: e.match?.pathname,
		// 	};

		if (e.match?.pathname === '/') {
			return {
				label: <House className='size-4' />,
				href: '/',
			};
		}

		return {
			label: e.breadcrumb,
			href: e.match?.pathname,
		};
	});

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items?.length > 0 &&
					items.slice(0, -1).map((item, index) =>
						item.href ? (
							<motion.span
								variants={variants}
								initial='initial'
								animate='animate'
								className='flex flex-wrap items-center gap-1.5 sm:gap-2.5'
								key={index + 'item'}
							>
								<BreadcrumbItem>
									<BreadcrumbLink
										aria-label='breadcrumb'
										className={cn('text-secondary')}
										href={item.href}
									>
										{item.label}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</motion.span>
						) : (
							<motion.span
								variants={variants}
								initial='initial'
								animate='animate'
								className='flex flex-wrap items-center gap-1.5 sm:gap-2.5'
								key={index + 'item'}
							>
								<BreadcrumbItem key={index + 'item-label'}>{item.label}</BreadcrumbItem>
								<BreadcrumbSeparator />
							</motion.span>
						)
					)}

				{items?.length > 0 && (
					<motion.span variants={variants} initial='initial' animate='animate'>
						<BreadcrumbItem key={items.length - 1} className='font-medium text-primary'>
							<BreadcrumbPage>{items[items.length - 1].label}</BreadcrumbPage>
						</BreadcrumbItem>
					</motion.span>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default GlobalBreadcrumbs;
