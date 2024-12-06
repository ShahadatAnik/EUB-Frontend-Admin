import { useLocation } from 'react-router-dom';
import useLayout from '@/hooks/useLayout';

import BrandLogo from '@/components/others/brand-logo';
import GlobalBreadcrumbs from '@/components/others/global-breadcrumbs';

import { cn } from '@/lib/utils';

import SidebarCollapse from '../sidebar/collapse';
import SidebarMobileToggle from '../sidebar/mobile/toggle';

const Navbar = () => {
	const { isCollapsed, setIsCollapsed } = useLayout();
	const { pathname } = useLocation();
	const homePage = pathname === '/';
	return (
		<div className='w-full border-b'>
			<div className='flex flex-col'>
				{/* Mobile View */}
				<div
					className={cn(
						'flex items-center justify-between gap-4 border-b bg-background px-4 py-1 md:hidden',
						homePage && 'border-none'
					)}
				>
					<BrandLogo name='EUB' className={'w-fit text-primary'} />
					<SidebarMobileToggle />
				</div>

				{/* Desktop View */}
				<div
					className={cn(
						'flex items-center gap-6 px-4 py-1 md:px-0 md:py-0',
						pathname === '/' && 'hidden md:block'
					)}
				>
					<div
						className='hidden w-fit cursor-pointer items-center border-r border-secondary/10 p-2 hover:bg-gray-300 md:flex'
						onClick={() => setIsCollapsed((prev) => !prev)}
					>
						<SidebarCollapse isCollapsed={isCollapsed} />
					</div>
					{!homePage && <GlobalBreadcrumbs />}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
