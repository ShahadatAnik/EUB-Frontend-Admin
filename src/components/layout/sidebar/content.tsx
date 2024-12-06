import { cn } from '@/lib/utils';

import SidebarHeader from './header';
import SidebarLogout from './logout';
import SidebarMenu from './menu';

const SidebarContent = () => {
	return (
		<aside className={cn('flex h-full flex-col bg-primary')}>
			<SidebarHeader />
			<SidebarMenu />
			<div className='p-4'>
				<SidebarLogout />
			</div>
		</aside>
	);
};

export default SidebarContent;
