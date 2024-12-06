import { IResponse } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { api } from '@/lib/api';

interface IUseTQuery {
	queryKey: (string | number | boolean | Date | undefined)[];
	url: string;
	enabled?: boolean;
}

const useTQuery = <T>({ queryKey, url, enabled = true }: IUseTQuery) => {
	const queryClient = useQueryClient();

	const { data, isError, isLoading, isPending, refetch, isFetching, status } = useQuery<IResponse<T>>({
		queryKey,
		queryFn: () => api.get(url).then((res) => res.data),
		refetchInterval: false,
		refetchOnMount: false,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
		refetchIntervalInBackground: false,
		enabled,
	});

	const postData = useMutation({
		mutationFn: async ({
			url,
			newData,
		}: {
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: () => void;
		}) => {
			const response = await api.post<IResponse<any>>(url, newData);
			return response.data;
		},

		onMutate: async ({ newData }) => {
			await queryClient.cancelQueries({ queryKey });
			return { newData };
		},

		onSuccess: (data) => {
			toast.success(data?.toast?.message);
			// ShowToast(data?.toast);
		},

		onError: (error: AxiosError<IResponse<any>>, newUser, context) => {
			queryClient.setQueryData(queryKey, ({ data }: { data: [] }) =>
				data?.filter((item: any) => item.id !== context?.newData?.uuid)
			);
			console.error(error);
			toast.error(error?.response?.data?.toast?.message);
			// ShowToast(error?.response!.data?.toast);
		},

		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });

			if (variables?.isOnCloseNeeded !== false) {
				variables?.onClose?.();
			}
		},
	});

	const updateData = useMutation({
		mutationFn: async ({
			url,
			updatedData,
		}: {
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: () => void;
		}) => {
			const response = await api.put<IResponse<any>>(url, updatedData);
			return response.data;
		},
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey,
			});
			const previousData = queryClient.getQueryData(queryKey);
			return { previousData: previousData };
		},
		onSuccess: (data) => {
			// ShowToast(data?.toast);
			toast.warning(data?.toast?.message);
		},
		onError: (error: AxiosError<IResponse<any>>, variables, context: any) => {
			queryClient.setQueryData(queryKey, context.previousData);
			console.log(error);
			// ShowToast(error?.response!.data?.toast);
			toast.error(error?.response!.data?.toast?.message);
		},

		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });
			if (variables?.isOnCloseNeeded !== false) {
				variables?.onClose?.();
			}
		},
	});

	const deleteData = useMutation({
		mutationFn: async ({ url }: { url: string; isOnCloseNeeded?: boolean; onClose?: () => void }) => {
			const response = await api.delete<IResponse<any>>(url);
			return response.data;
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
		},
		onSuccess: (data) => {
			// ShowToast(data?.toast);
			toast.error(data?.toast?.message);
		},
		onError: (error: AxiosError<IResponse<any>>) => {
			console.log(error);
			// ShowToast(error?.response!.data?.toast);
			toast.error(error?.response!.data?.toast?.message);
		},
		onSettled: (data, error, variables) => {
			queryClient.invalidateQueries({ queryKey });
			variables?.onClose?.();
		},
	});

	return {
		url,
		// * Data
		data: data?.data,
		toast: data?.toast,

		// * States
		isLoading: isLoading,
		isError,
		isPending,
		isFetching,
		status,
		// * Mutations
		updateData,
		postData,
		deleteData,
		// * Refetch
		refetch,
		invalidateQuery: () => queryClient.invalidateQueries({ queryKey }),
	};
};

export default useTQuery;
