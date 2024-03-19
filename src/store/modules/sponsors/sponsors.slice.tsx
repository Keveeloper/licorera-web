import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/sponsors.reducers";
import { getSponsorsThunk } from "./actions/sponsors.actions";

export const SPONSOR_FEATURE_KEY = "sponsors";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const sponsorSlice = createSlice({
  name: SPONSOR_FEATURE_KEY,
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
      .addCase(getSponsorsThunk.pending, reducers.sponsorPending)
      .addCase(getSponsorsThunk.fulfilled, reducers.sponsorFulfilled)
      .addCase(getSponsorsThunk.rejected, reducers.sponsorRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const sponsorReducer = sponsorSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const sponsorActions = sponsorSlice.actions;
