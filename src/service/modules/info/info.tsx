import { Data } from '../../../store/modules/campaigns/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';

export const getInfo = async (): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/mobile/tresjotasInfo`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getIsActive = async (): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/mobile/isActive`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const postSuggestion= async (request:any): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.post<Data>(
      `/mobile/emailsuggest`,
      request
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};