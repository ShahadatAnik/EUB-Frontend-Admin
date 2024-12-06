// prettier-ignore
import { Toast } from '@/components/others/toast';

import { AuthProvider } from '@/context';
import { router } from '@/routes/router';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';

const App = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toast />
			<Toaster richColors position={'top-center'} expand={true} />
		</AuthProvider>
	);
};

export default App;
