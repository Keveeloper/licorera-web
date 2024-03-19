import { createSlice } from "@reduxjs/toolkit";

import { PromotionState } from "./types";
import * as reducers from "./reducers/newProducts.reducers";
import { getNewProductsThunk } from "./actions/newProducts.actions";

export const NEW_PRODUCTS_FEATURE_KEY = "newProducts";

export const initialState: PromotionState = {
  loadingStatus: "loading",
  error: null,
  state: {
    data:[],
    success:false,
    message:''
  },
};

export const newProductsSlice = createSlice({
  name: NEW_PRODUCTS_FEATURE_KEY,
  initialState,
  reducers: {
    clearState: () => {
      // Clearing redux state and localForage happens in store.ts.
    },
    clearPersonalInfo: (status: PromotionState) => {
      status.state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewProductsThunk.pending, reducers.newProductsPending)
      .addCase(getNewProductsThunk.fulfilled, reducers.newProductsFulfilled)
      .addCase(getNewProductsThunk.rejected, reducers.newProductsRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const newProductsReducer = newProductsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const newProductsActions = newProductsSlice.actions;
