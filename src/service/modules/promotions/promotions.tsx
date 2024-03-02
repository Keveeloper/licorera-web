import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { ResponsePromotions } from './types';

export const getPromotions = async (): Promise<ApiResponse<ResponsePromotions>> => {
  try {
   
    const { data } = await base.get<ResponsePromotions>(
      '/mobile/promotions',
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

