import { IRoute } from '@/types';

function filterRoutes(routes: IRoute[]) {
	const can_access = localStorage.getItem('can_access');

	if (String(can_access).length < 3) return [];

	const userAccess = JSON.parse(JSON.parse(can_access!)) || {};

	// Helper function to check if a route has read access
	function hasReadAccess(route: IRoute) {
		return userAccess[route.page_name!] && userAccess[route.page_name!].includes('read');
	}

	// Recursive function to filter routes and their children
	function filterRecursive(routes: IRoute[]): IRoute[] {
		return routes.filter((route: IRoute) => {
			if (route.children) {
				// Recursively filter children and keep only those with read access
				route.children = filterRecursive(route.children);

				// Keep the parent route if it has read access or at least one child has read access
				return hasReadAccess(route) || route?.children!.length > 0;
			} else {
				// Keep the route if it has read access
				return hasReadAccess(route);
			}
		});
	}

	return filterRecursive(routes);
}

export default filterRoutes;
