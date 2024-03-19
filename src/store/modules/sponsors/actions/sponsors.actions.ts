import { getSponsors } from '../../../../service/modules/sponsors/sponsors'; 
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getPromotionsThunk = createAsyncThunk(
//   "promotion",
//   async () => {
//     const response = await getPromotions();
//     return response;
//   }
// );

export const getSponsorsThunk = createAsyncThunk(
  "sponsors/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSponsors();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
