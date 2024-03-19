import { getNewProducts } from '../../../../service/modules/newProducts/campaigns'; 
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNewProductsThunk = createAsyncThunk(
  "newProducts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNewProducts();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
