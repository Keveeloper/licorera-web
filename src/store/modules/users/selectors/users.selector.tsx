import { createSelector } from '@reduxjs/toolkit';

import { PersonalInfoState, RootState } from '../../../types';
import { PERSONAL_INFO_FEATURE_KEY } from '../users.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPersonalInfoState = (rootState: RootState): PersonalInfoState =>
  rootState[PERSONAL_INFO_FEATURE_KEY];

export const selectAllPersonalInfo = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.data
);

