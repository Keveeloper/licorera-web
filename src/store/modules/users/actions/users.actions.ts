import {
  getUser,
  postCreateUser,
  postRememberPassword,
  postUserLogin,
  putUser,
  refreshUserLogin,
} from "../../../../service/modules/users/users";
import { LoginRequest, postUserRequest, putUserRequest } from "../../../../service/modules/users/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInfo } from "../../../../service/modules/info/info";

export const userLogin = createAsyncThunk(
  "login",
  async (reqData: LoginRequest, { rejectWithValue, dispatch }) => {
    const response = await postUserLogin(reqData);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

export const refreshToken = createAsyncThunk(
  "refresh",
  async (refresh_token: string, { rejectWithValue, dispatch }) => {
    
    const response = await refreshUserLogin(refresh_token);
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

export const getInfoThunk = createAsyncThunk(
  "getInfo",
  async ( 
  ) => {
    const response = await getInfo();
    return response;
  }
);

export const postUserThunks = createAsyncThunk(
  "postUserThunks",
  async (reqData: postUserRequest, { rejectWithValue, dispatch }) => {
    const response = await postCreateUser(reqData);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

export const postrememberPasswordThunks = createAsyncThunk(
  "postrememberPasswordThunks",
  async (email: string, { rejectWithValue, dispatch }) => {
    const response = await postRememberPassword(email);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

