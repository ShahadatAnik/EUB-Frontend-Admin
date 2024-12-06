import axios, { AxiosHeaderValue } from 'axios';
import Cookies from 'js-cookie';

import { ShowToast } from '@/components/others/toast';

import { BASE_API } from './secret';

export const createApi = ({ contentType }: { contentType: AxiosHeaderValue }) => {
	const api = axios.create({
		baseURL: BASE_API,
		headers: { 'Content-Type': contentType },
	});

	api.interceptors.request.use(
		(config) => {
			const token = Cookies?.get('auth');

			if (token) {
				config.headers.Authorization = token;
			}
			return config;
		},
		(error) => {
			ShowToast(error?.response);
			return Promise.reject(error);
		}
	);

	return api;
};

export const api = createApi({ contentType: 'application/json' });
export const image_api = createApi({ contentType: 'multipart/form-data' });
