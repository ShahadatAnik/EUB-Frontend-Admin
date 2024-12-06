import { filterRoutes, filterSidebarRoutes, flattenRoutes } from '@/utils';

import { privateRoutes, privateRoutesClone } from './private';

//* all private routes
export const allPrivateRoutes = privateRoutes;

//* all private routes flatten
export const allFlatRoutes = flattenRoutes(allPrivateRoutes);

//* filtered routes which has read access
// export const filteredRoutes = allPrivateRoutes;
export const filteredRoutes = filterRoutes(privateRoutesClone);

//* flatten routes which has read access
export const flatRoutes = flattenRoutes(filteredRoutes);

//* sidebar routes which has view access only in sidebar
export const sidebarRoutes = filterSidebarRoutes(filteredRoutes);

// * first route
export const firstRoute = flatRoutes[0]?.children ? flatRoutes[0].children[0] : flatRoutes[0];
