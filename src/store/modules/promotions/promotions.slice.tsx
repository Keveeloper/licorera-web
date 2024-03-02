import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PromotionState, Promotion } from "./types";
import { getPromotions } from "./actions/promotion.actions";
import * as reducers from "./reducers/promotion.reducers";

export const PROMOTION_FEATURE_KEY = "promotions";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  data: {
  
  },
};

export const promotionSlice = createSlice({
  name: PROMOTION_FEATURE_KEY,
  initialState,
  reducers: {
    setPersonalInfo: (
      status: PromotionState,
      action: PayloadAction<Promotion>
    ) => {
      status.data = { ...status.data, ...action.payload };
    },
    clearState: () => {
      // Clearing redux state and localForage happens in store.ts.
    },
    clearPersonalInfo: (status: PromotionState) => {
      status.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, reducers.promotionPending)
      .addCase(getPromotions.fulfilled, reducers.promotionFulfilled)
      .addCase(getPromotions.rejected, reducers.promotionRejected);
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
