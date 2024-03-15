import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartState } from "./types";
import * as reducers from "./reducers/cart.reducers";

export const CART_FEATURE_KEY = "cart";

export const initialState: CartState = {
  loadingStatus: "loading",
  error: null,
  state: {
    products:[],
  },
};

export const cartSlice = createSlice({
  name: CART_FEATURE_KEY,
  initialState,
  reducers: {
    setCartProducts: (
      state: CartState,
      action: PayloadAction<any>
    ) => {
      state.state.products = action.payload;
    },
    clearState: () => {
      // Clearing redux state and localForage happens in store.ts.
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(getSuggestedProductThunk.pending, reducers.cartPending)
    //   .addCase(getSuggestedProductThunk.fulfilled, reducers.cartFulfilled)
    //   .addCase(getSuggestedProductThunk.rejected, reducers.cartRejected);
  },
});

/*
 * Export reducer for store configuration.
 */
export const cartReducer = cartSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 */
export const cartActions = cartSlice.actions;
