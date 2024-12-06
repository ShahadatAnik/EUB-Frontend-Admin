import { sidebarRoutes } from '@/routes';

import SidebarItem from './item';

const SidebarMenu = () => {
	console.log({
		sidebarRoutes,
	});
	return (
		<ul className='h-full flex-1 space-y-1 overflow-auto px-4'>
			{sidebarRoutes.map((item: any, index: number) => {
				return <SidebarItem key={index} {...item} />;
			})}
		</ul>
	);
};

export default SidebarMenu;
