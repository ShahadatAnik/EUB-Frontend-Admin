import useTQuery from '@/hooks/useTQuery';

import { QK } from './queryKeys';

export const useNewsPortal = <T>() =>
	useTQuery<T>({
		queryKey: QK.all(),
		url: '/news/news-portal',
	});

export const useNewsPortalByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: QK.byUUID(uuid),
		url: `/news/news-portal/${uuid}`,
		enabled: !!uuid,
	});

export const useLatestNewsPortal = <T>() =>
	useTQuery<T>({
		queryKey: QK.latestPost(),
		url: '/news/news-portal/latest-post',
	});
