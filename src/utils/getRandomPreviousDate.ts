export function getRandomPreviousDate(maxDaysBack: number = 365): Date {
	const currentDate: Date = new Date();
	const daysBack: number = Math.floor(Math.random() * maxDaysBack) + 1;
	const randomDate: Date = new Date(currentDate.getTime() - daysBack * 24 * 60 * 60 * 1000);

	return randomDate;
}
