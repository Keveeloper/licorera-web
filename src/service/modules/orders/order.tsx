import { base } from "../../base-api/base";
import { handleSubModuleError } from "../../tools/apiError";
import { ApiResponse } from "../../tools/types";

export type requestOrder = {
    products:string,
    amount:number,
    instructions:string,
    source: string
}
export type requestUpdateOrder = {
    latitude:string,
    longitude:string,
    address:string,
    addressDetails:string,
    paymentMethod:string,
    pay_method:string,
    amount:number,
    phone:string,
    discountCode:string,
    instructions:string,
    description:string,
    transactionId:string
}

export const getCurrentOrder= async (): Promise<ApiResponse<any>> => {
  try {
    const  {data}  = await base.get<any>(
      `/v2/clients/orders/current`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};

export const getOrders= async (page:number): Promise<ApiResponse<any>> => {
  try {
    const  {data}  = await base.get<any>(
      `/v2/clients/orders?page=${page}`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};


export const getOrder= async (id:number): Promise<ApiResponse<any>> => {
  try {
    const  {data}  = await base.get<any>(
      `/v2/clients/orders/${id}`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};



export const getOrderById= async (id:number): Promise<ApiResponse<any>> => {
  try {
    const  {data}  = await base.get<any>(
      `/v2/payments/confirmation/${id}`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};


export const cancelCurrentOrder= async (): Promise<ApiResponse<any>> => {
  try {
    const  {data}  = await base.get<any>(
      `/v2/clients/orders/current/cancel`,
      {}
      );
      return { response: data, success: !!Object.keys(data).length };
    
  } catch (error) {
    return handleSubModuleError(error);
  }
};



export const postOrder= async (request:requestOrder): Promise<ApiResponse<any>> => {
    try {
      const  {data}  = await base.post<requestOrder>(
        `/v2/orders`,
        request
        );
      return { response: data, success: !!Object.keys(data).length };
      
    } catch (error) {
      return handleSubModuleError(error);
    }
};

export const updateOrder= async (id:number,request:requestUpdateOrder): Promise<ApiResponse<any>> => {
    try {
      const  {data}  = await base.put<requestUpdateOrder>(
        `/v2/orders/${id}`,
        request
        );
      return { response: data, success: !!Object.keys(data).length };
      
    } catch (error) {
      return handleSubModuleError(error);
    }
};