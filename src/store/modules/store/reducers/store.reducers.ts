import { PayloadAction } from '@reduxjs/toolkit';

import { PersonalInfoState } from '../types';

export const categoriesPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const categoriesFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.categories = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const categoriesRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

export const categoriesByIdPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.data.token = '';
  state.error = undefined;
};

export const categoriesByIdFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.data = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const categoriesByIdRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};


