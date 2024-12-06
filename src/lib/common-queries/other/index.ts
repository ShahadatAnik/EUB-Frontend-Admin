import useTQuery from '@/hooks/useTQuery';

import otherQK from './query-keys';

// GET OTHER PARTY
export const useOtherParty = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.party(),
		url: '/other/party/value/label',
	});

// GET OTHER MARKETING USER
export const useOtherMarketingUser = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.marketingUser(),
		url: '/other/marketing-user/value/label',
	});

// GET OTHER BUYER
export const useOtherBuyer = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.buyer(),
		url: '/other/buyer/value/label',
	});

// GET OTHER MERCHANDISER BY PARTY UUID
export const useOtherMerchandiserByPartyUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: otherQK.merchandiserByPartyUUID(uuid),
		url: `/other/merchandiser/value/label/${uuid}`,
		enabled: !!uuid,
	});

// GET OTHER FACTORY BY PARTY UUID
export const useOtherFactoryByPartyUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: otherQK.factoryByPartyUUID(uuid),
		url: `/other/factory/value/label/${uuid}`,
		enabled: !!uuid,
	});

// GET OTHER MARKETING
export const useOtherMarketing = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.marketing(),
		url: '/other/marketing/value/label',
	});

// GET OTHER ORDER
export const useOtherOrder = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.order(),
		url: '/other/order/info/value/label',
	});

export const useOtherOrderDescription = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.orderDescription(),
		url: '/other/order/description/value/label',
	});

// GET OTHER ORDER PROPERTIES BY TYPE NAME
export const useOtherOrderPropertiesByTypeName = <T>(name: string) =>
	useTQuery<T>({
		queryKey: otherQK.orderPropertiesByTypeName(name),
		url: `/other/order-properties/by/${name}`,
		enabled: !!name,
	});

// GET OTHER ORDER ENTRY
export const useOtherOrderEntry = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.orderEntry(),
		url: `/other/order/entry/value/label`,
	});

// GET OTHER VENDOR
export const useOtherVendor = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.vendor(),
		url: `/other/vendor/value/label`,
	});

// GET OTHER MATERIAL SECTION
export const useOtherMaterialSection = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.materialSection(),
		url: `/other/material-section/value/label`,
	});

// GET OTHER MATERIAL TYPE
export const useOtherMaterialType = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.materialType(),
		url: `/other/material-type/value/label`,
	});

// GET OTHER MATERIAL
export const useOtherMaterial = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.material(),
		url: `/other/material/value/label/unit/quantity`,
	});

// GET OTHER BANK
export const useOtherBank = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.bank(),
		url: `/other/bank/value/label`,
	});

// GET OTHER LC BY PARTY UUID
export const useOtherLcByPartyUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: otherQK.lcByPartyUUID(uuid),
		url: `/other/lc/value/label/${uuid}`,
		enabled: !!uuid,
	});

// GET OTHER PI
export const useOtherPI = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.pi(),
		url: `/other/pi/value/label`,
	});

// GET OTHER ORDER DESCRIPTION BY ORDER NUMBER
export const useOtherOrderDescriptionByOrderNumber = <T>(orderNumber: string) =>
	useTQuery<T>({
		queryKey: otherQK.orderDescriptionByOrderNumber(orderNumber),
		url: `/other/order/order_description_uuid/by/${orderNumber}`,
		enabled: !!orderNumber,
	});

// GET OTHER ORDER NUMBER BY MARKETING AND PARTY UUID
export const useOtherOrderNumberByMarketingAndPartyUUID = <T>(marketingUUID: string, partyUUID: string) =>
	useTQuery<T>({
		queryKey: otherQK.orderNumberByMarketingAndPartyUUID(marketingUUID, partyUUID),
		url: `/other/order-number-for-pi/value/label/${marketingUUID}/${partyUUID}`,
		enabled: !!marketingUUID && !!partyUUID,
	});

// GET OTHER DEPARTMENT
export const useOtherDepartment = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.department(),
		url: `/other/department/value/label`,
	});

// GET OTHER DESIGNATION
export const useOtherDesignation = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.designation(),
		url: `/other/designation/value/label`,
	});

// GET OTHER LAB DIP
export const useOtherLabDip = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.labDip(),
		url: `/other/lab-dip/recipe/value/label`,
	});

// GET OTHER SLIDER ITEM
export const useOtherSliderItem = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.sliderItem(),
		url: `/other/slider-item-name/value/label`,
	});

// GET OTHER THREAD COUNT LENGTH
export const useOtherThreadCountLength = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.threadCountLength(),
		url: `/other/thread/count-length/value/label`,
	});
