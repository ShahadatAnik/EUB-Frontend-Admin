import { IDefaultAddOrUpdateProps, IDefaultFileAddOrUpdateProps, IToast } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import '../columns/columns.type';

import { ICategoryTableData } from '../columns/columns.type';

//* Visitor
export interface IVisitorAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICategoryTableData | null;
}
