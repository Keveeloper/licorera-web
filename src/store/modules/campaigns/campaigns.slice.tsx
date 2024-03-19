import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/campaigns.reducers";
import { getCampaignsThunk } from "./actions/campaigns.actions";

export const CAMPAIGN_FEATURE_KEY = "campaigns";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const campaignSlice = createSlice({
  name: CAMPAIGN_FEATURE_KEY,
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
      .addCase(getCampaignsThunk.pending, reducers.campaignPending)
      .addCase(getCampaignsThunk.fulfilled, reducers.campaignFulfilled)
      .addCase(getCampaignsThunk.rejected, reducers.campaignRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const campaignReducer = campaignSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const campaignActions = campaignSlice.actions;
