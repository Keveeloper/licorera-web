import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/suggested.reducers";
import { getSuggestedProductThunk } from "./actions/suggested.actions";

export const SUGGESTED_FEATURE_KEY = "suggestedProducts";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const suggestedSlice = createSlice({
  name: SUGGESTED_FEATURE_KEY,
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
      .addCase(getSuggestedProductThunk.pending, reducers.suggestedPending)
      .addCase(getSuggestedProductThunk.fulfilled, reducers.suggestedFulfilled)
      .addCase(getSuggestedProductThunk.rejected, reducers.suggestedRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const suggestedReducer = suggestedSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const suggestedActions = suggestedSlice.actions;
