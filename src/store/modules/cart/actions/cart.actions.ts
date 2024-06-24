import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder, requestOrder, requestUpdateOrder, updateOrder } from "../../../../service/modules/orders/order";


export const postOrderThunk = createAsyncThunk(
    "posPaymentPseThunk/fetch",
    async ({reqData}: {reqData: requestOrder}, { rejectWithValue }) => {
      try {
        const response = await postOrder(reqData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.message); 
      }
    }
  );

  export const updateOrderThunk = createAsyncThunk(
    "updateOrderThunk/fetch",
    async ({id, reqData }: { id: number, reqData: requestUpdateOrder}, { rejectWithValue }) => {
      try {
        const response = await updateOrder(id, reqData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.message); 
      }
    }
  );  