import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { SUGGESTED_FEATURE_KEY } from '../suggested.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[SUGGESTED_FEATURE_KEY];

export const selectAllSuggested = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




