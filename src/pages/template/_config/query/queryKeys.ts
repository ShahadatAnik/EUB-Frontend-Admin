// TODO: Remove this demo key and add all the query keys like this
export const testQK = {
	all: () => ['test'],
	byUUID: (uuid: string) => ['test', uuid],
	detailsByUUID: (uuid: string) => ['test', uuid, 'details'],
};
