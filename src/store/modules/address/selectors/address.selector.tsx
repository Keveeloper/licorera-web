import { createSelector } from '@reduxjs/toolkit';

import { AddressState, RootState } from '../types';
import { ADDRESS_FEATURE_KEY } from '../address.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPersonalInfoState = (rootState: RootState): AddressState =>
  rootState[ADDRESS_FEATURE_KEY];

export const selectAllPersonalInfo = createSelector(
  getPersonalInfoState,
  (Address) => Address.data
);



