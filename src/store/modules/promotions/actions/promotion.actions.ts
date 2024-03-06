import { getPromotions } from '../../../../service/modules/promotions/promotions'; 
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getPromotionsThunk = createAsyncThunk(
//   "promotion",
//   async () => {
//     const response = await getPromotions();
//     return response;
//   }
// );

export const getPromotionsThunk = createAsyncThunk(
  "promotions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPromotions();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
