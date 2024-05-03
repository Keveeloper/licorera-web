import { Data } from '../../../store/modules/search/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';

export const getSearched = async (searchedText: string): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/mobile/search?q=${searchedText}`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

