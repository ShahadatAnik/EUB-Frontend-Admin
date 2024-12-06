import { motion } from 'framer-motion';
import useLayout from '@/hooks/useLayout';

import SidebarContent from '../content';

const variants = {
	open: {
		opacity: 1,
		width: 100 + 'vw',
		transform: 'translateX(0)',
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	closed: {
		opacity: 0,
		width: 0,
		overflow: 'hidden',
		transform: 'translateX(5vw)',
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
};

const SidebarMobile = () => {
	const { sidebarOpen } = useLayout();
	return (
		<motion.div
			initial='closed'
			variants={variants}
			animate={sidebarOpen ? 'open' : 'closed'}
			className='fixed right-0 top-0 z-[99999] h-screen'
		>
			<SidebarContent />
		</motion.div>
	);
};

export default SidebarMobile;
