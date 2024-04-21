import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { SEARCH_FEATURE_KEY } from '../search.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[SEARCH_FEATURE_KEY];

export const selectSearched = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




