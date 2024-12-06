import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { Form, FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { ILoginData, LOGIN_NULL, LOGIN_SCHEMA } from './schema';

const LoginForm = () => {
	const { login } = useAuth();
	const form = useRHF(LOGIN_SCHEMA, LOGIN_NULL);

	const onSubmit = async (data: ILoginData) => {
		await login(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-6 flex max-w-md flex-col space-y-6 sm:mt-10'
			>
				<FormField
					control={form.control}
					name='email'
					render={(props) => <CoreForm.Input type='email' {...props} />}
				/>
				<FormField
					control={form.control}
					name='pass'
					render={(props) => <CoreForm.Input type='password' label='Password' {...props} />}
				/>

				<CoreForm.Submit title='Login' />
			</form>
		</Form>
	);
};

export default LoginForm;
