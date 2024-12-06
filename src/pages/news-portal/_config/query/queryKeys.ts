export const QK = {
	all: () => ['news-portal'],
	byUUID: (uuid: string) => [...QK.all(), uuid],
	latestPost: () => [...QK.all(), 'latest-post'],
};
