import { IRoute } from '@/types';

function flattenRoutes(routes: IRoute[]) {
	const flattenedArray: IRoute[] = [];

	function flattenRecursive(route: IRoute) {
		if (!route) {
			return;
		}

		flattenedArray.push(route);

		if (route.children) {
			route.children.forEach((child: IRoute) => flattenRecursive(child));
		}
	}

	routes.forEach((item) => flattenRecursive(item));

	return flattenedArray;
}

export default flattenRoutes;
