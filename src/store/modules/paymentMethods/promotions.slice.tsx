import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/paymentMethods.reducers";
import { getPaymentMethodsThunk } from "./actions/paymentMethods.actions";

export const PROMOTION_FEATURE_KEY = "promotions";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const promotionSlice = createSlice({
  name: PROMOTION_FEATURE_KEY,
  initialState,
  reducers: {
    clearState: () => {
      // Clearing redux state and localForage happens in store.ts.
    },
    clearPersonalInfo: (status: PromotionState) => {
      status.state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethodsThunk.pending, reducers.promotionPending)
      .addCase(getPaymentMethodsThunk.fulfilled, reducers.promotionFulfilled)
      .addCase(getPaymentMethodsThunk.rejected, reducers.promotionRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const promotionReducer = promotionSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const promotionActions = promotionSlice.actions;
