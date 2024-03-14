import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSuggestedProducts } from '../../../../service/modules/suggestedProducts/suggested';


export const getSuggestedProductThunk = createAsyncThunk(
  "suggested/fetch",
  async ( _
    , { rejectWithValue }) => {
    try {
      const response = await getSuggestedProducts();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
