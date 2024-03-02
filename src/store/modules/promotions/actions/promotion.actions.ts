import { getPromotions } from '../../../../service/modules/promotions/promotions'; 
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPromotionsThunk = createAsyncThunk(
  "promotion",
  async () => {
    const response = await getPromotions();
    return response;
  }
);
