import {
  postUserLogin,
} from "../../../../service/modules/users/users";
import { LoginRequest, putUserRequest } from "../../../../service/modules/users/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocations } from "../../../../service/modules/address/address";

export const GoogleApithunks = createAsyncThunk(
  "GoogleApithunks",
  async (reqData: LoginRequest, { rejectWithValue, dispatch }) => {
    const response = await postUserLogin(reqData);
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);

export const getLocationsThunk = createAsyncThunk(
  "getLocationsThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLocations();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);



