import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { EXCHANGE_FEATURE_KEY } from '../exchange.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[EXCHANGE_FEATURE_KEY];

export const selectAllPromotion = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectFirstImage = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data[0].image
);

export const selectLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




