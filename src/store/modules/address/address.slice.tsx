import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AddressState, ResponsePersonalInfo } from "./types";
import {  getLocationsThunk, GoogleApithunks } from "./actions/address.actions";
import * as reducers from "./reducers/address.reducers";

export const ADDRESS_FEATURE_KEY = "address";

export const initialState: AddressState = {
  loadingStatus: "loading",
  addressSelected:"",
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
     setAddressSelected: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.addressSelected = action.payload;
    },
    clearAddress: (status: AddressState) => {
      status.data = {};
    },
    clearAddressSelected: ( state: AddressState) => {
      state.addressSelected = {} 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocationsThunk.pending, reducers.LocationsPending)
      .addCase(getLocationsThunk.fulfilled, reducers.LocationsFulfilled)
      .addCase(getLocationsThunk.rejected, reducers.LocationsRejected)
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
