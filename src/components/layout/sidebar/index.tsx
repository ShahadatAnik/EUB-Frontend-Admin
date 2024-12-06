import { SidebarProvider } from '@/context';
import { useMediaQuery } from '@uidotdev/usehooks';

import SidebarDesktop from './desktop';
import SidebarMobile from './mobile';

const Sidebar = () => {
	const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
	return (
		<SidebarProvider>
			{!isSmallDevice && <SidebarDesktop />}
			{isSmallDevice && <SidebarMobile />}
		</SidebarProvider>
	);
};

export default Sidebar;
