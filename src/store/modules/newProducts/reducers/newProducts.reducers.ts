import { PayloadAction } from '@reduxjs/toolkit';

import { PromotionState } from '../types';

export const newProductsPending = (state: PromotionState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const newProductsFulfilled = (
  state: PromotionState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const newProductsRejected = (
  state: PromotionState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

