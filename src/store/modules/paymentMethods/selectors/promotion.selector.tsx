import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { PROMOTION_FEATURE_KEY } from '../promotions.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[PROMOTION_FEATURE_KEY];

export const selectAllPaymentMethods = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




