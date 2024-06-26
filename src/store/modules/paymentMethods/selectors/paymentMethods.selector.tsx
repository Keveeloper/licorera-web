import { createSelector } from '@reduxjs/toolkit';

import { PaymentMethodState, RootState } from '../types';
import { PAYMENT_METHODS_FEATURE_KEY } from '../paymentMethods.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPaymentMethodState = (rootState: RootState): PaymentMethodState =>
  rootState[PAYMENT_METHODS_FEATURE_KEY];

export const selectAllPaymentMethods = createSelector(
  getPaymentMethodState,
  (payment) => payment?.state?.cards
);

export const selectLoading = createSelector(
  getPaymentMethodState,
  (payment) => payment.loadingStatus
);

export const selectAllPaymentSeleted = createSelector(
  getPaymentMethodState,
  (payment) => payment.paymentSelected
);