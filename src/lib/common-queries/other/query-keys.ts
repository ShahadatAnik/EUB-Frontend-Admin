const otherQK = {
	all: () => ['other'],

	//Order
	order: () => [...otherQK.all(), 'order'],
	orderDescription: () => [...otherQK.all(), 'order-description'],
	orderEntry: () => [...otherQK.all(), 'order-entry'],
	orderDescriptionByOrderNumber: (orderNumber: string) => [
		...otherQK.all(),
		'order-description-by-order-number',
		orderNumber,
	],
	orderPropertiesByTypeName: (typeName: string) => [...otherQK.all(), 'properties-by-type-name', typeName],
	orderNumberByMarketingAndPartyUUID: (marketingUUID: string, partyUUID: string) => [
		...otherQK.all(),
		'number-by-marketing-and-party',
		marketingUUID,
		partyUUID,
	],

	//Vendor
	vendor: () => [...otherQK.all(), 'vendor'],

	//Bank
	bank: () => [...otherQK.all(), 'bank'],

	//Material
	material: () => [...otherQK.all(), 'material'],
	materialSection: () => [...otherQK.all(), 'material-section'],
	materialType: () => [...otherQK.all(), 'material-type'],

	//Lab Dip
	labDip: () => [...otherQK.all(), 'lab-dip'],

	//Slider Item
	sliderItem: () => [...otherQK.all(), 'slider-item'],

	//Slider Item
	threadCountLength: () => [...otherQK.all(), 'thread-count-length'],

	//LC
	lcByPartyUUID: (uuid: string) => [...otherQK.all(), 'lc-by-party', uuid],

	//PI
	pi: () => [...otherQK.all(), 'pi'],

	//Department
	department: () => [...otherQK.all(), 'department'],

	//Designation
	designation: () => [...otherQK.all(), 'designation'],

	// Party
	party: () => [...otherQK.all(), 'party'],

	//Buyer
	buyer: () => [...otherQK.all(), 'buyer'],

	//Marketing
	marketing: () => [...otherQK.all(), 'marketing'],
	marketingUser: () => [...otherQK.all(), 'marketing-user'],

	//Merchandiser
	merchandiserByPartyUUID: (uuid: string) => [...otherQK.all(), 'merchandiser-by-party', uuid],

	//Factory
	factoryByPartyUUID: (uuid: string) => [...otherQK.all(), 'factory-by-party', uuid],
};

export default otherQK;
