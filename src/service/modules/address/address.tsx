import { Data } from '../../../store/modules/campaigns/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { CreateLocationRequest, FavoriteRequest } from './type';

export const getGoogleApi = async (search:string): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/v2/locations/google/${search}`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getGoogleReverseApi = async (latitude:number,longitude:number): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/v2/locations/google/${latitude}/${longitude}`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};


export const postLocation = async (payload:CreateLocationRequest): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.post<Data>(
      `/v2/locations`,
      payload
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getLocations= async (): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.get<Data>(
      `/v2/me/locations`
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const postDelivery= async (request:any): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.post<Data>(
      `mobile/orders/deliveryValue`,
      request
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const postDisccount= async (request:any): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.post<Data>(
      `mobile/searchCode`,
      request
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const deleteLocation = async (idLocation: number): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.delete<Data>(
      `/v2/locations/${idLocation}`
      );
    return { response: data, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const postFavoriteLocation = async (reqData: FavoriteRequest): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.post<Data>(
      `/v2/me/locations`,
      reqData
      );
    return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const deleteFavoriteLocation = async (idLocation: number): Promise<ApiResponse<Data>> => {
  try {
    const  {data}  = await base.delete<Data>(
      `/v2/me/locations/${idLocation}`
      );
    return { response: data, success: !!Object.keys(data).length };
  } catch (error) {
    return handleSubModuleError(error);
  }
};



