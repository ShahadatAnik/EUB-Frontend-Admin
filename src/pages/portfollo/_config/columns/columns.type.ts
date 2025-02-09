//* Authorities
export type IAuthoritiesTableData = {
	id: number;
	uuid: string;
	user_uuid: string;
	category:
		| 'chancellor'
		| 'chairman'
		| 'vc'
		| 'pro_vc'
		| 'dean'
		| 'treasurer'
		| 'director_coordination'
		| 'registrar';
	short_biography: string;
};
//* Certificate Course Fee
export type ICertificateCourseFeeTableData = {
	id: number;
	uuid: string;
	programs_uuid: string;
	fee_per_course: number;
};
//* Tuition Fee
export type ITuitionFeeTableData = {
	id: number;
	uuid: string;
	title: string;
	program_uuid: string;
	admission_fee: number; // Decimal(20,4)
	tuition_fee_per_credit?: number; // Optional fields
	student_activity_fee_per_semester?: number;
	library_fee_per_semester?: number;
	computer_lab_fee_per_semester?: number;
	science_lab_fee_per_semester?: number;
	studio_lab_fee?: number; // Default value is 0
};
