import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AddressState, ResponsePersonalInfo } from "./types";
import {  GoogleApithunks } from "./actions/address.actions";
import * as reducers from "./reducers/address.reducers";

export const ADDRESS_FEATURE_KEY = "address";

export const initialState: AddressState = {
  loadingStatus: "loading",
  error: null,
  data: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    token: "",
  },
};

export const addressSlice = createSlice({
  name: ADDRESS_FEATURE_KEY,
  initialState,
  reducers: {
    clearAddress: (status: AddressState) => {
      status.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GoogleApithunks.pending, reducers.GoogleApiPending)
      .addCase(GoogleApithunks.fulfilled, reducers.GoogleApiFulfilled)
      .addCase(GoogleApithunks.rejected, reducers.GoogleApiRejected)
  },
});

/*
 * Export reducer for store configuration.
 */
export const addressReducer = addressSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const addressActions = addressSlice.actions;
