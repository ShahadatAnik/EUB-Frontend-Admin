function confirmRouteMatch(route: any, url: string) {
	// Base case: If the URL is empty, return false
	if (url === '') {
		return false;
	}

	// If the route has a path and it matches the URL, check for children
	if (route?.path && route.path === url) {
		return true; // Exact match found
	} else if (route.children) {
		// Recursively check children if the current route doesn't match
		const childMatch = route.children.some((child: any) => {
			return confirmRouteMatch(child, url);
		});

		if (childMatch) {
			return true;
		}
	}

	// No match found
	return false;
}

export default confirmRouteMatch;
