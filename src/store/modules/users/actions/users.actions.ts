import {
  getUser,
  postUserLogin,
  putUser,
} from "../../../../service/modules/users/users";
import { LoginRequest, putUserRequest } from "../../../../service/modules/users/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "login",
  async (reqData: LoginRequest, { rejectWithValue, dispatch }) => {
    const response = await postUserLogin(reqData);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

export const getMe = createAsyncThunk(
  "getMe",
  async (token:string, { rejectWithValue }) => {
    const response = await getUser(
      token
    );
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

export const updateUserInfo = createAsyncThunk(
  "update",
  async ({reqData, userId}: {reqData: putUserRequest, userId: string}, { rejectWithValue, dispatch }) => {
    const response = await putUser(reqData, userId);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);
