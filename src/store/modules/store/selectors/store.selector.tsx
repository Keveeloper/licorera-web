import { createSelector } from '@reduxjs/toolkit';

import { PersonalInfoState, RootState } from '../types';
import { STORE_FEATURE_KEY } from '../store.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getStoreState = (rootState: RootState): PersonalInfoState =>
  rootState[STORE_FEATURE_KEY];

export const selectAllCategories = createSelector(
  getStoreState,
  (categorie) => categorie.data
);

export const selectArrayCategories = createSelector(
  getStoreState,
  (categories) => categories.categories.data
);

export const selectCategoriesLoading = createSelector(
  getStoreState,
  (categorie) => categorie.loadingStatus
);

