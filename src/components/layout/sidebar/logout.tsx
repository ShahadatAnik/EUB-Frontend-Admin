import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

import User from '@/components/others/user';

const SidebarLogout = () => {
	const { logout } = useAuth();

	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			className='flex w-full items-center gap-3 rounded-md bg-gradient-to-r from-accent/10 to-accent/30 px-5 py-2 text-left text-sm font-normal text-primary-foreground'
			onClick={logout}
		>
			<LogOut className='size-6 text-primary-foreground' />
			<User />
		</motion.button>
	);
};

export default SidebarLogout;
