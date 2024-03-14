import { Data } from '../../../store/modules/promotions/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';


export const getSuggestedProducts = async (): Promise<ApiResponse<Data>> => {
  try {
   
    const  {data}  = await base.get<Data>(
      `/mobile/suggestedProducts`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

