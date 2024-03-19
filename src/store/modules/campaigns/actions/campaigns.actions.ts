import { getCampaigns } from '../../../../service/modules/campaigns/campaigns'; 
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCampaignsThunk = createAsyncThunk(
  "campaigns/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCampaigns();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
