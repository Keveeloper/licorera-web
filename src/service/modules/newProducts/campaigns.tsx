import { Data } from '../../../store/modules/newProducts/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';

export const getNewProducts = async (): Promise<ApiResponse<Data>> => {
  try {
   
    const  {data}  = await base.get<Data>(
      '/mobile/newProducts',
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

