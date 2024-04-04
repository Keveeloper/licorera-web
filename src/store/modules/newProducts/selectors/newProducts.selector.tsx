import { createSelector } from '@reduxjs/toolkit';

import { PromotionState, RootState } from '../types';
import { NEW_PRODUCTS_FEATURE_KEY } from '../newProducts.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): PromotionState =>
  rootState[NEW_PRODUCTS_FEATURE_KEY];

export const selectAllNewProducts = createSelector(
  getPromotionState,
  (promotion) => promotion.state.data
);

export const selectNewProductsLoading = createSelector(
  getPromotionState,
  (promotion) => promotion.loadingStatus
);




