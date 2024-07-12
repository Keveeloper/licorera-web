import { getExchangeProducts, getMeExchangeProducts } from '../../../../service/modules/exchangeProducts/exchanges'; 
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExchangeRequest } from '../../../../service/modules/exchangeProducts/types';


export const getExchangeProductThunk = createAsyncThunk(
  "exchange/fetch",
  async ( reqData: ExchangeRequest
    , { rejectWithValue }) => {
    try {
      const response = await getExchangeProducts(reqData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);

export const getMeExchangeProductThunk = createAsyncThunk(
  "meExchange/fetch",
  async ( page: number, { rejectWithValue }) => {
    try {
      const response = await getMeExchangeProducts(page);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);
