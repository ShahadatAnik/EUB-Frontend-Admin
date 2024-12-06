import { IToast } from '@/types';
import { Slide, toast, ToastContainer, ToastContainerProps } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const ToastBody = ({ text }: { text: string }) => (
	<div className='flex items-center'>
		<p className='text-sm font-medium text-gray-900'>{text}</p>
	</div>
);

const SuccessToast = (text: string) => toast.success(<ToastBody {...{ text }} />);
const WarningToast = (text: string) => toast.warn(<ToastBody {...{ text }} />);
const ErrorToast = (text: string) => toast.error(<ToastBody {...{ text }} />);

const ShowLocalToast = ({ type, message }: Omit<IToast, 'status'>) => {
	switch (type) {
		case 'create':
		case 'insert':
			SuccessToast(message);
			break;
		case 'delete':
		case 'error':
			ErrorToast(message);
			break;
		case 'warning':
		case 'update':
			WarningToast(message);
			break;
		default:
			toast(<ToastBody text={message} />);
	}
};

const ShowToast = (toast: Omit<IToast, 'status'>) => {
	const { type, message } = toast;
	ShowLocalToast({
		type,
		message,
	});
};

const DefaultConfig: ToastContainerProps = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	closeButton: false,
};

const Toast = () => {
	return <ToastContainer style={{ width: 'auto' }} transition={Slide} {...DefaultConfig} />;
};

export { ErrorToast, ShowLocalToast, ShowToast, SuccessToast, Toast, WarningToast };
