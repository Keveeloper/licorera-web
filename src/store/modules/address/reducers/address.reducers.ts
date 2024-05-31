import { PayloadAction } from '@reduxjs/toolkit';

import { AddressState } from '../types';

export const LocationsPending = (state: AddressState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const LocationsFulfilled = (
  state: AddressState,
  action: PayloadAction<any>
) => {
  state.data = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const LocationsRejected = (
  state: AddressState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};







