import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { ResponseAuth, LoginRequest } from './types';

export const postUserLogin = async ( reqData: LoginRequest): Promise<ApiResponse<ResponseAuth>> => {
  try {
   
    const { data } = await base.post<ResponseAuth>(
      '/v2/login',
      reqData,
      {}
      );
    return { response: data, status: data.status, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};

