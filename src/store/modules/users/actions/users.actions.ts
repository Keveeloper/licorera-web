import {
  getUser,
  postUserLogin,
} from "../../../../service/modules/users/users";
import { LoginRequest } from "../../../../service/modules/users/types";
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
  async (_, { rejectWithValue }) => {
    const response = await getUser(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6IjExMTI5Njc0OTgiLCJpc3MiOiJFbWFpbCBBbmQgUGFzd29yZCIsImVtYWlsIjoiZGllZ280QG1haWwuY29tIiwiaWF0IjoxNzA5OTMzNDMwLCJleHAiOjE3MDk5NzY2MzB9.C1hZUttdktz7Mk4wvwWt46ytFtO1prpq5AjcjYIjktTI35LHYKaR46VXruGNUHbjWV1zSg329LpQ_IlrQceuwRaFZYi9LW2wETvIEvfMqGC_7olhTHX421A_f-I9RxW6XNagsU8MfSTechORaqFjdeQdoHppic-boAptB4dd-CHs6rWVPEY5qf-mh3oGuueoli5Wox_VxUOaD3p6hmT89YOoMJcHp6Sy6CmsEbBJXxFsS_z7f-sRnz_8ANcZHN4x0Z3PKvoccs3LJ6wjNj3oYD1aiNgow77pHFjtTeJU0jmgq9h4kc1-M7OULLgT0iBabn0xlbao6XWXZwVWJUCd8w"
    );
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);
