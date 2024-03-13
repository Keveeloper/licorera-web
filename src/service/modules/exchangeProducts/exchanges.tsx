import { Data } from '../../../store/modules/promotions/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { ExchangeRequest } from './types';

export const getExchangeProducts = async (request:ExchangeRequest): Promise<ApiResponse<Data>> => {
  try {
   
    const  {data}  = await base.get<Data>(
      `/mobile/promotionProducts?page=${request.page}`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

