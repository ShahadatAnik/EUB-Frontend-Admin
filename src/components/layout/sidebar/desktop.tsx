import { motion } from 'framer-motion';
import useLayout from '@/hooks/useLayout';

import SidebarContent from './content';

const SidebarDesktop = () => {
	const { isCollapsed } = useLayout();
	return (
		<motion.div
			initial='open'
			variants={{
				open: { opacity: 1, width: '16rem' },
				closed: { opacity: 1, width: 0, overflow: 'hidden' },
			}}
			animate={isCollapsed ? 'closed' : 'open'}
		>
			<SidebarContent />
		</motion.div>
	);
};

export default SidebarDesktop;
