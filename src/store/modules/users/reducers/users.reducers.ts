import { PayloadAction } from '@reduxjs/toolkit';

import { PersonalInfoState } from '../../../types';

export const userLoginInfoPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.data.token = '';
  state.error = undefined;
};

export const userLoginInfoFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.data = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const userLoginInfoRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

export const getuserLoginInfoPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.data = {};
  state.error = undefined;
};

export const getuserLoginFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.data = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const getuserLoginInfoRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};
