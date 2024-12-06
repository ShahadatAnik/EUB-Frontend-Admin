import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

import LoginForm from './form';

const Login = () => {
	const { user, signed } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (signed === true) {
			navigate('/', { replace: true });
		}
	}, [signed, user, navigate]);

	return (
		<div className='flex min-h-screen min-w-max flex-col justify-center bg-background py-6 sm:py-12'>
			<div className='relative min-w-[40%] py-3 sm:mx-auto sm:max-w-xl'>
				<div className='absolute inset-0 -skew-y-6 transform animate-pulse bg-gradient-to-r from-primary to-primary/50 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl'></div>
				<div className='relative bg-background px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20'>
					<div className='mx-auto'>
						<span className='font-heading flex items-center justify-center text-2xl font-bold'>
							<span className='text-4xl text-primary'>European University</span>
						</span>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
