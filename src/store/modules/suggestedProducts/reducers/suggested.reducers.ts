import { PayloadAction } from '@reduxjs/toolkit';

import { PromotionState } from '../types';

export const suggestedPending = (state: PromotionState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const suggestedFulfilled = (
  state: PromotionState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const suggestedRejected = (
  state: PromotionState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

