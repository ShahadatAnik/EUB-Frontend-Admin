import DashboardRoutes from '@/pages/dashboard/_config/routes';
import HrRoutes from '@/pages/hr/_config/routes';
import NewsPortalRoutes from '@/pages/news-portal/_config/routes';
import TemplateRoutes from '@/pages/template/_config/routes';
import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

const privateRoutes: IRoute[] = [...DashboardRoutes, ...NewsPortalRoutes, ...HrRoutes, ...TemplateRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
