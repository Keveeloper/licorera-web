import { deletePaymentMethods, getPaymentMethods } from "../../../../service/modules/paymentMethods/paymentMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeletePaymentMethod } from "../../../../service/modules/paymentMethods/types";

export const getPaymentMethodsThunk = createAsyncThunk(
  "getPayment/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentMethods();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);

export const deletePaymentMethodsThunk = createAsyncThunk(
  "removePayment/fetch",
  async ({reqData}: {reqData: DeletePaymentMethod}, { rejectWithValue }) => {
    try {
      const response = await deletePaymentMethods(reqData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
