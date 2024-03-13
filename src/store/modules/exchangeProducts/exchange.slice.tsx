import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/exchange.reducers";
import { getExchangeProductThunk } from "./actions/exchange.actions";

export const EXCHANGE_FEATURE_KEY = "exchangeProducts";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const exchangeSlice = createSlice({
  name: EXCHANGE_FEATURE_KEY,
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
      .addCase(getExchangeProductThunk.pending, reducers.exchangePending)
      .addCase(getExchangeProductThunk.fulfilled, reducers.exchangeFulfilled)
      .addCase(getExchangeProductThunk.rejected, reducers.exchangeRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const exchangeReducer = exchangeSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const exchangeActions = exchangeSlice.actions;
