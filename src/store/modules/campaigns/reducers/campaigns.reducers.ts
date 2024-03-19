import { PayloadAction } from '@reduxjs/toolkit';

import { PromotionState } from '../types';

export const campaignPending = (state: PromotionState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const campaignFulfilled = (
  state: PromotionState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const campaignRejected = (
  state: PromotionState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

