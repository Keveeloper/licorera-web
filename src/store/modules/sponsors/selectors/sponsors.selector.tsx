import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { SPONSOR_FEATURE_KEY } from '../sponsors.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[SPONSOR_FEATURE_KEY];

export const selectAllSponsors = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectFirstImage = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data[0].imageUrl
);

export const selectLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




