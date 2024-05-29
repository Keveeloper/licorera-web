import {
  postUserLogin,
} from "../../../../service/modules/users/users";
import { LoginRequest, putUserRequest } from "../../../../service/modules/users/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GoogleApithunks = createAsyncThunk(
  "GoogleApithunks",
  async (reqData: LoginRequest, { rejectWithValue, dispatch }) => {
    const response = await postUserLogin(reqData);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

