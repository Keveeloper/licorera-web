import { getSearched } from "../../../../service/modules/search/search"; 
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchedThunk = createAsyncThunk(
  "search/fetch",
  async (searchedText: string, { rejectWithValue }) => {
    try {
      const response = await getSearched(searchedText);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
