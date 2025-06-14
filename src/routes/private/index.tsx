import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import FDERoutes from './fde';
import HrRoutes from './hr';
import inquiryRoutes from './inquiry';
import LIBRoutes from './lib';
import PortfolioRoutes from './portfollo';
import procurementRoutes from './procurement';
import ProfileRoutes from './profile';

const privateRoutes: IRoute[] = [
	...HrRoutes,
	...PortfolioRoutes,
	...inquiryRoutes,
	...procurementRoutes,
	...ProfileRoutes,
	...LIBRoutes,
	...FDERoutes,
];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
