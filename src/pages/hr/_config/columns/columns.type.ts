// Department
export type IDepartmentTableData = {
	uuid: string;
	department: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

// Designation
export type IDesignationTableData = {
	uuid: string;
	designation: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};

// User
export type IUserTableData = {
	uuid: string;
	name: string;
	email: string;
	designation_uuid: string;
	designation: string;
	department_uuid: string;
	department: string;
	ext: string;
	phone: string;
	created_at: string;
	updated_at: any;
	status: string;
	remarks: string;
};

// Reset Password
export type IResetPassword = {
	uuid: string;
	name: string;
};

// Page Assign
export type IPageAssign = {
	uuid: string;
	name: string;
};
