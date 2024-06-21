import { PayloadAction } from '@reduxjs/toolkit';

import { PaymentMethodState } from '../types';

export const paymentMethodsPending = (state: PaymentMethodState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const paymentMethodsFulfilled = (
  state: PaymentMethodState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const paymentMethodsRejected = (
  state: PaymentMethodState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

//////////////////////////// Remove ////////////////////////////////////////////////////
export const removePending = (state: PaymentMethodState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const removeFulfilled = (
  state: PaymentMethodState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const removeRejected = (
  state: PaymentMethodState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};


//////////////////////////// Add ////////////////////////////////////////////////////
export const addPending = (state: PaymentMethodState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const addFulfilled = (
  state: PaymentMethodState,
  action: PayloadAction<any>
) => {
  state.state = action.payload.response;
  state.loadingStatus = 'loaded';
  // state.loadingStatus = 'loading';
};

export const addRejected = (
  state: PaymentMethodState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

