import { PayloadAction } from '@reduxjs/toolkit';

import { PersonalInfoState } from '../types';

export const userLoginInfoPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
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


// GET ME 
export const getMePending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.user = '';
  state.error = undefined;
};

export const getMeFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.user = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const getMeRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

// UPDATE USER INFO
export const updateuserInfoPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.error = undefined;
};

export const updateUserInfoFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.user = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const updateUserInfoRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};

// GET INFO 
export const getInfoPending = (state: PersonalInfoState) => {
  state.loadingStatus = 'loading';
  state.info = '';
  state.error = undefined;
};

export const getInfoFulfilled = (
  state: PersonalInfoState,
  action: PayloadAction<any>
) => {
  state.info = action.payload.response;
  state.loadingStatus = 'loaded';
};

export const getInfoRejected = (
  state: PersonalInfoState,
  action: any
) => {
  state.loadingStatus = 'error';
  state.error = action.payload || action.error;
};


