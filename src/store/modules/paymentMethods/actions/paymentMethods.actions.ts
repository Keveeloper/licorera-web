import { addPaymentMethods, deletePaymentMethods, getPaymentBanks, getPaymentMethods, posPaymentCreditCard, posPaymentPse } from "../../../../service/modules/paymentMethods/paymentMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddPaymentMethod, DeletePaymentMethod, posPaymentCredit } from "../../../../service/modules/paymentMethods/types";
import { AnyARecord } from "dns";

export const getPaymentMethodsThunk = createAsyncThunk(
  "getPayment/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentMethods();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);

export const deletePaymentMethodsThunk = createAsyncThunk(
  "removePayment/fetch",
  async ({reqData}: {reqData: DeletePaymentMethod}, { rejectWithValue }) => {
    try {
      const response = await deletePaymentMethods(reqData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);

export const addPaymentMethodsThunk = createAsyncThunk(
  "addPayment/fetch",
  async ({reqData}: {reqData: AddPaymentMethod}, { rejectWithValue }) => {
    try {
      const response = await addPaymentMethods(reqData);
      console.log('Response en el addPaymentMethodsThunk: ', response.response);
      
      return response.response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Enviar el mensaje de error
    }
  }
);

export const getPaymentBanksThunk = createAsyncThunk(
  "getPaymentBanksThunk/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentBanks();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);

export const posPaymentPseThunk = createAsyncThunk(
  "posPaymentPseThunk/fetch",
  async ({reqData}: {reqData: any}, { rejectWithValue }) => {
    try {
      const response = await posPaymentPse(reqData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);

export const posPaymentCreditThunk = createAsyncThunk(
  "posPaymentCreditThunk/fetch",
  async ({reqData}: {reqData: posPaymentCredit}, { rejectWithValue }) => {
    try {
      const response = await posPaymentCreditCard(reqData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);

