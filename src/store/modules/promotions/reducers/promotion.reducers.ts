import { PayloadAction } from '@reduxjs/toolkit';

import { PromotionState } from '../types';

export const promotionPending = (state: PromotionState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const promotionFulfilled = (
  state: PromotionState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const promotionRejected = (
  state: PromotionState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

