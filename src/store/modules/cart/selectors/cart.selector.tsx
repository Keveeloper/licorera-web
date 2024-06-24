import { createSelector } from '@reduxjs/toolkit';

import { CartState, RootState } from '../types';
import { CART_FEATURE_KEY } from '../cart.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPromotionState = (rootState: RootState): CartState =>
  rootState[CART_FEATURE_KEY];

export const selectAllCart= createSelector(
  getPromotionState,
  (promotion) => promotion.state
);

export const selectCartProducts= createSelector(
  getPromotionState,
  (promotion) => promotion.state.products
);





