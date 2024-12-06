function matchUrl(url: string, item: string) {
	if (!item || !url) return false;

	const regex = new RegExp(`^${url.replace(/:\w+/g, '[^/]+')}$`);
	return regex?.test(item);
}

export default matchUrl;
