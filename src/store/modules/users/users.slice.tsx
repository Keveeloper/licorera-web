import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PersonalInfoState, ResponsePersonalInfo } from "../../types";
import { userLogin } from "./actions/users.actions";
import * as reducers from "./reducers/users.reducers";

export const PERSONAL_INFO_FEATURE_KEY = "personalInfo";

export const initialState: PersonalInfoState = {
  loadingStatus: "loading",
  error: null,
  data: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    token: "",
  },
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
    clearState: () => {
      // Clearing redux state and localForage happens in store.ts.
    },
    clearPersonalInfo: (status: PersonalInfoState) => {
      status.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, reducers.userLoginInfoPending)
      .addCase(userLogin.fulfilled, reducers.userLoginInfoFulfilled)
      .addCase(userLogin.rejected, reducers.userLoginInfoRejected);
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
