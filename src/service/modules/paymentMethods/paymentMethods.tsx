import { Data } from '../../../store/modules/paymentMethods/types';
import { base } from '../../base-api/base';
import { handleSubModuleError } from '../../tools/apiError';
import { ApiResponse } from '../../tools/types';
import { AddPaymentMethod, DeletePaymentMethod } from './types';

export const getPaymentMethods = async (): Promise<ApiResponse<Data>> => {
  try {
   
    const {data} = await base.get<Data>(
      '/v2/me/paymentMethods',
      {}
      );
      console.log('Data service: ',data.data);
      
      return { response: data.data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const deletePaymentMethods = async (reqData: DeletePaymentMethod): Promise<ApiResponse<Data>> => {
  try {
    const {data} = await base.post<Data>(
      '/v2/me/paymentMethods/remove',
      reqData,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const addPaymentMethods = async (reqData: AddPaymentMethod): Promise<ApiResponse<Data>> => {
  try {
    const {data} = await base.post<Data>(
      '/v2/me/paymentMethods/add',
      reqData,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

