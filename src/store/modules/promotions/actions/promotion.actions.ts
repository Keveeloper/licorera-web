import { postUserLogin } from '../../../../service/modules/users/users';
import { LoginRequest } from '../../../../service/modules/users/types';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPromotions = createAsyncThunk(
  "promotion",
  async (
    reqData: LoginRequest,
    { rejectWithValue, dispatch }
  ) => {
    const response = await postUserLogin(
      reqData
    );
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);
