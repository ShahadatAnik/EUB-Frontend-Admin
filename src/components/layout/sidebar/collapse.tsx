import { motion } from 'framer-motion';
import { PanelLeftOpenIcon, PanelRightOpenIcon } from 'lucide-react';

import TooltipWrapper from '@/components/others/tooltip-wrapper';

const SidebarCollapse = ({ isCollapsed }: { isCollapsed: boolean }) => {
	return (
		<motion.button aria-label='Collapse Sidebar' whileTap={{ scale: 0.9 }}>
			<TooltipWrapper message='Toggle Sidebar (Ctrl+Q)'>
				{isCollapsed ? <PanelLeftOpenIcon className='size-6' /> : <PanelRightOpenIcon className='size-6' />}
			</TooltipWrapper>
		</motion.button>
	);
};

export default SidebarCollapse;
