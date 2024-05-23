import { getPaymentMethods } from "../../../../service/modules/paymentMethods/paymentMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPaymentMethodsThunk = createAsyncThunk(
  "paymentMethods/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentMethods();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
