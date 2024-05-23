import { createSlice } from "@reduxjs/toolkit";

import { PaymentMethodState } from "./types";
import * as reducers from "./reducers/paymentMethods.reducers";
import { getPaymentMethodsThunk } from "./actions/paymentMethods.actions";

export const PAYMENT_METHODS_FEATURE_KEY = "paymentMethods";

export const initialState: PaymentMethodState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:{
      id_customer: '',
      name: '',
      created: '',
      email: '',
      phone: '',
      address: '',
      cards: [],
    },
    success:false,
    message:''
  },
};

export const paymentMethodsSlice = createSlice({
  name: PAYMENT_METHODS_FEATURE_KEY,
  initialState,
  reducers: {
    clearState: () => {
      // Clearing redux state and localForage happens in store.ts.
    },
    clearPersonalInfo: (status: PaymentMethodState) => {
      status.state.data = {
        id_customer: '',
        name: '',
        created: '',
        email: '',
        phone: '',
        address: '',
        cards: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethodsThunk.pending, reducers.paymentMethodsPending)
      .addCase(getPaymentMethodsThunk.fulfilled, reducers.paymentMethodsFulfilled)
      .addCase(getPaymentMethodsThunk.rejected, reducers.paymentMethodsRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const paymentMethodsReducer = paymentMethodsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const paymentMethodsActions = paymentMethodsSlice.actions;
