
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getCategoriesById } from '../../../../service/modules/store/store';
import { CategoriesRequest } from '../../../../service/modules/store/types';

export const Categories = createAsyncThunk(
  "categories",
  async (
  ) => {
    const response = await getCategories();

    return response;
  }
);

export const CategoriesById = createAsyncThunk(
  "categoriesbyid",
  async (
    reqData: CategoriesRequest,
    { rejectWithValue, dispatch }
  ) => {
    const response = await getCategoriesById(
       reqData
    );
    if (!response.success) throw rejectWithValue(response);

    return response;
  }
);
