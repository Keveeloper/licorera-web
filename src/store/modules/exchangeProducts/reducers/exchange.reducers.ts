import { PayloadAction } from '@reduxjs/toolkit';

import { PromotionState } from '../types';

export const exchangePending = (state: PromotionState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const exchangeFulfilled = (
  state: PromotionState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const exchangeRejected = (
  state: PromotionState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};


export const exchangeMePending = (state: PromotionState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const exchangeMeFulfilled = (
  state: PromotionState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const exchangeMeRejected = (
  state: PromotionState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

