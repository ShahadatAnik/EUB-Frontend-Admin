import { IRoute } from '@/types';

import SidebarFile from './file';
import SidebarFolder from './folder';

const SidebarItem: React.FC<IRoute> = ({ path, name, children, disableCollapse, page_type }) => {
	return children ? (
		<SidebarFolder path={path} name={name} disableCollapse={disableCollapse}>
			{children}
		</SidebarFolder>
	) : (
		<SidebarFile path={path} name={name} page_type={page_type} />
	);
};

export default SidebarItem;
