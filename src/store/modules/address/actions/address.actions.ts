import {
  postUserLogin,
} from "../../../../service/modules/users/users";
import { LoginRequest, putUserRequest } from "../../../../service/modules/users/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFavoriteLocation, deleteLocation, getLocations, postFavoriteLocation } from "../../../../service/modules/address/address";
import { FavoriteRequest } from "../../../../service/modules/address/type";

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

export const deleteLocationThunk = createAsyncThunk(
  "deleteLocationThunk",
  async (idAddress: number, { rejectWithValue }) => {
    try {
      const response = await deleteLocation(idAddress);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);

export const deleteFavoriteLocationThunk = createAsyncThunk(
  "deleteFavoriteLocationThunk",
  async (idAddress: number, { rejectWithValue }) => {
    try {
      const response = await deleteFavoriteLocation(idAddress);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);

export const postFavoriteLocationThunk = createAsyncThunk(
  "deleteFavoriteLocationThunk",
  async (reqData: FavoriteRequest, { rejectWithValue }) => {
    try {
      const response = await postFavoriteLocation(reqData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  }
);



