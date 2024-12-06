import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	// department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	// designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	// user
	userDefault: () => [...hrQK.all(), 'user'],
	user: ({ start_date, end_date, status }: IParams) => [...hrQK.userDefault(), start_date, end_date, status],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
};
