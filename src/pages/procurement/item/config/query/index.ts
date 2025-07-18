import useTQuery from '@/hooks/useTQuery';

import { itemQK } from './queryKeys';

// * ITEM
export const useItem = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: itemQK.item(query),
		url: query ? `/procure/item?${query}` : `/procure/item`,
	});

export const useItemByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: itemQK.itemByUUID(uuid),
		url: `/procure/item/${uuid}`,
		enabled: !!uuid,
	});

export const useItemAndVendorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: itemQK.itemAndVendorByUUID(uuid),
		url: `/procure/item-details/by/item-uuid/${uuid}`,
		enabled: !!uuid,
	});

export const useVendors = <T>(param: string) =>
	useTQuery<T>({
		queryKey: itemQK.vendor(),
		url: `/procure/item-vendor?item_uuid=${param}`,
		enabled: !!param,
	});
