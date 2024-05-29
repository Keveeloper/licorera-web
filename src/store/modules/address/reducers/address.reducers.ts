import { PayloadAction } from '@reduxjs/toolkit';

import { AddressState } from '../types';

export const GoogleApiPending = (state: AddressState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const GoogleApiFulfilled = (
  state: AddressState,
  action: PayloadAction<any>
) => {
  state.data = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const GoogleApiRejected = (
  state: AddressState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};







