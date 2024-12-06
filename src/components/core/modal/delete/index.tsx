import { ReloadIcon } from '@radix-ui/react-icons';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { IDeleteModalProps } from '../types';

const DeleteModal: React.FC<IDeleteModalProps> = ({ deleteItem, setDeleteItem, url, deleteData, onClose }) => {
	const handleConfirm = async () => {
		await deleteData.mutateAsync({
			url: `${url}/${deleteItem?.id}`,
			onClose: () => {
				onClose?.();
				setDeleteItem(null);
			},
		});
	};

	return (
		<AlertDialog open={!!deleteItem}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete "{deleteItem && (deleteItem.name || deleteItem.id)}"?
					</AlertDialogTitle>
					<AlertDialogDescription>You cannot undo this action.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setDeleteItem(null)}>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={deleteData.isPending} onClick={handleConfirm}>
						{deleteData.isPending && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
						{deleteData.isPending ? 'Please wait...' : 'Confirm'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteModal;
