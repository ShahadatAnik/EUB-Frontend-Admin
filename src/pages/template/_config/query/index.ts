import useTQuery from '@/hooks/useTQuery';

import { testQK } from './queryKeys';

// TODO: Remove this demo query and add all the queries like this
export const useTest = <T>() =>
	useTQuery<T>({
		queryKey: testQK.all(),
		url: '/test',
		enabled: false,
	});

export const useTestByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: testQK.byUUID(uuid),
		url: `/test/${uuid}`,
		enabled: false,
	});

export const useTestDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: testQK.detailsByUUID(uuid),
		url: `/test/${uuid}/details`,
		enabled: false,
	});
