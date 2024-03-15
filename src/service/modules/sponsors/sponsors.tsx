import { Data } from '../../../store/modules/sponsors/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';

export const getSponsors = async (): Promise<ApiResponse<Data>> => {
  try {
   
    const  {data}  = await base.get<Data>(
      '/v2/sponsors',
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

