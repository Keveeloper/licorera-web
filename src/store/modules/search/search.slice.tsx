import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/search.reducers";
import { getSearchedThunk } from "./actions/search.actions";

export const SEARCH_FEATURE_KEY = "search";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const searchedSlice = createSlice({
  name: SEARCH_FEATURE_KEY,
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
      .addCase(getSearchedThunk.pending, reducers.searchedPending)
      .addCase(getSearchedThunk.fulfilled, reducers.searchedFulfilled)
      .addCase(getSearchedThunk.rejected, reducers.searchedRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const searchedReducer = searchedSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const searchedActions = searchedSlice.actions;
