import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { CAMPAIGN_FEATURE_KEY } from '../campaigns.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[CAMPAIGN_FEATURE_KEY];

export const selectAllCampaigns = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




