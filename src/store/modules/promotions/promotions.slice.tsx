import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PromotionState, Promotion } from "./types";
import { getPromotions } from "../../../service/modules/promotions/promotions"; 
import * as reducers from "./reducers/promotion.reducers";
import { getPromotionsThunk } from "./actions/promotion.actions";

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
      .addCase(getPromotionsThunk.pending, reducers.promotionPending)
      .addCase(getPromotionsThunk.fulfilled, reducers.promotionFulfilled)
      .addCase(getPromotionsThunk.rejected, reducers.promotionRejected);
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
