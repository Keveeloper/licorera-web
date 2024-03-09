import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PersonalInfoState, ResponsePersonalInfo } from "./types";
import { getMe, userLogin } from "./actions/users.actions";
import * as reducers from "./reducers/users.reducers";

export const PERSONAL_INFO_FEATURE_KEY = "user";

export const initialState: PersonalInfoState = {
  loadingStatus: "loading",
  error: null,
  isWelcome: false,
  data: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    token: "",
  },
  user:{}
};

export const personalInfoSlice = createSlice({
  name: PERSONAL_INFO_FEATURE_KEY,
  initialState,
  reducers: {
    setPersonalInfo: (
      status: PersonalInfoState,
      action: PayloadAction<ResponsePersonalInfo>
    ) => {
      status.data = { ...status.data, ...action.payload };
    },
    setIsWelcome: (
      state: PersonalInfoState,
      action: PayloadAction<any>
    ) => {
      state.isWelcome = action.payload;
    },
    clearState: (status:PersonalInfoState, action: PayloadAction<any> ) => {
      status.data = {}
      status.user = {}
      status.isWelcome =  action.payload;
    },
    clearPersonalInfo: (status: PersonalInfoState) => {
      status.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, reducers.userLoginInfoPending)
      .addCase(userLogin.fulfilled, reducers.userLoginInfoFulfilled)
      .addCase(userLogin.rejected, reducers.userLoginInfoRejected)
      .addCase(getMe.pending, reducers.getMePending)
      .addCase(getMe.fulfilled, reducers.getMeFulfilled)
      .addCase(getMe.rejected, reducers.getMeRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const personalInfoReducer = personalInfoSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const personalInfoActions = personalInfoSlice.actions;
