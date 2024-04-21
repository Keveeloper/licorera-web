import { getPaymentMethods } from "../../../../service/modules/paymentMethods/paymentMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getPromotionsThunk = createAsyncThunk(
//   "promotion",
//   async () => {
//     const response = await getPromotions();
//     return response;
//   }
// );

export const getPaymentMethodsThunk = createAsyncThunk(
  "promotions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentMethods();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
