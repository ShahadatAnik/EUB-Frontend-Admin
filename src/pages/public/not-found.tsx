import React from 'react';
import { firstRoute } from '@/routes';
import { Ban, Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';

type TTemplate = {
	icon: JSX.Element;
	title: string;
	subtitle: string;
	children?: React.ReactNode;
};

const Template: React.FC<TTemplate> = ({ icon, title, subtitle, children }) => {
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-12 py-8'>
			{icon}
			<div className='flex flex-col items-center gap-4'>
				<h1 className='text-center text-3xl font-medium capitalize'>{title}</h1>
				<p className='text-center text-xl'>{subtitle}</p>
				{children}
			</div>
		</div>
	);
};

export default function NotFound() {
	const navigate = useNavigate();
	const { signed } = useAuth();

	if (!signed) {
		return (
			<Template
				icon={<Ban className='size-24 text-red-600' />}
				title='not authorized'
				subtitle='You must be logged in to access'
			>
				<Button
					aria-label='Go To Login'
					onClick={() => {
						navigate('/login', { replace: true });
					}}
					className='w-full'
				>
					Go To Login
				</Button>
			</Template>
		);
	}

	if (firstRoute?.path !== undefined) {
		return (
			<Template
				icon={<Ban className='size-24 text-red-600' />}
				title='Page Not Found'
				subtitle={`Sorry, the page you are looking for does not exist`}
			>
				<Button
					aria-label='Go Home'
					onClick={() => {
						navigate(firstRoute?.path ?? '/login');
					}}
					className='w-full'
				>
					Go Home
				</Button>
			</Template>
		);
	}

	return (
		<Template
			icon={<Frown className='size-24 text-red-600' />}
			title='No Page Assigned'
			subtitle={`Sorry, no page has been assign to you. Talk to your system Admin`}
		></Template>
	);
}
