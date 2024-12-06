import { motion } from 'framer-motion';
import { CopyMinus, X } from 'lucide-react';
import useLayout from '@/hooks/useLayout';
import useSidebar from '@/hooks/useSidebar';

import BrandLogo from '@/components/others/brand-logo';
import TooltipWrapper from '@/components/others/tooltip-wrapper';
import { buttonVariants } from '@/components/ui/button';

const SidebarHeader = () => {
	const { setSidebarOpen } = useLayout();
	const { setIsCloseAll } = useSidebar();

	return (
		<div>
			<div className='relative border-b border-border/10 px-4 py-6'>
				<BrandLogo name='EUB' />

				<span className='absolute right-4 top-4 hidden text-xs italic text-secondary-light md:block'>V2.0</span>

				<button
					className='btn btn-square btn-ghost btn-sm absolute right-4 top-4 text-white md:hidden'
					onClick={() => setSidebarOpen(false)}
				>
					<X />
				</button>
			</div>

			<div className='flex justify-end px-2 py-2'>
				<TooltipWrapper message='Collapse Folders'>
					<motion.button
						aria-label='Collapse Folders'
						whileTap={{ scale: 0.9 }}
						onClick={() => setIsCloseAll((prev) => !prev)}
						className={buttonVariants({
							variant: 'default',
							size: 'icon',
						})}
					>
						<CopyMinus className='size-4' />
					</motion.button>
				</TooltipWrapper>
			</div>
		</div>
	);
};

export default SidebarHeader;
