import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { ResponseAuth, LoginRequest, putUserRequest } from './types';

export const postUserLogin = async ( reqData: LoginRequest): Promise<ApiResponse<ResponseAuth>> => {
  try {
    const { data } = await base.post<any>(
      '/v2/login',
      reqData,
      {}
      );
    return { response: data?.data, status: data.status, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getUser = async (token: string): Promise<ApiResponse<ResponseAuth>> => {
  try {
    const { data } = await base.get<any>(
      '/v2/me',
      { headers:{
        Authorization: token
      } }
      );
    return { response: data?.data, status: data.status, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const putUser = async ( reqData: putUserRequest, userId: string): Promise<ApiResponse<ResponseAuth>> => {
  try {
    const { data } = await base.put<any>(
      `/mobile/clients/${userId}`,
      reqData,
      {}
      );
    return { response: data?.data, status: data.status, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};


