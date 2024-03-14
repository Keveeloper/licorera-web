import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { Categories, CategoriesById } from "./actions/store.actions";
import * as reducers from "./reducers/store.reducers";
import { PersonalInfoState } from "./types";

export const STORE_FEATURE_KEY = "store";

export const initialState: PersonalInfoState = {
  loadingStatus: "loading",
  error: null,
  categories:{},
  data: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    token: "",
    isWelcome: false
  },
};

export const storeSlice = createSlice({
  name: STORE_FEATURE_KEY,
  initialState,
  reducers: {
    setProductDetail: (
      state: PersonalInfoState,
      action: PayloadAction<any>
    ) => {
      state.productDetail = action.payload;
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
      .addCase(Categories.pending, reducers.categoriesPending)
      .addCase(Categories.fulfilled, reducers.categoriesFulfilled)
      .addCase(Categories.rejected, reducers.categoriesRejected)
      .addCase(CategoriesById.pending, reducers.categoriesByIdPending)
      .addCase(CategoriesById.fulfilled, reducers.categoriesByIdFulfilled)
      .addCase(CategoriesById.rejected, reducers.categoriesByIdRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const storeReducer = storeSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const storeActions = storeSlice.actions;
