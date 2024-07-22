import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { CategoriesResponse, CategoriesRequest } from './types';

export const getCategories = async (): Promise<ApiResponse<CategoriesResponse>> => {
  try {
    const { data } = await base.get<CategoriesResponse>(
      '/mobile/categories',
      {}
      );
    return { response: data, status: 200, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getCategoriesById = async (request:CategoriesRequest): Promise<ApiResponse<CategoriesResponse>> => {
    try {
      var sort = request.sort ? `&sort=${request.sort}` : '';
      const { data } = await base.get<CategoriesResponse>(
        `/mobile/categories/${request.id}/products?page=${request.page}${sort}`,
        {}
        );
      return { response: data, status: 200, success: !!Object.keys(data).length };
    } catch (error) {
      return handleSubModuleError(error);
    }
};

export const getStoreProductsById = async (id:number): Promise<ApiResponse<CategoriesResponse>> => {
  try {
    const { data } = await base.get<CategoriesResponse>(
      `/mobile/storeProducts/${id}`,
      {}
      );
    return { response: data, status: 200, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};
