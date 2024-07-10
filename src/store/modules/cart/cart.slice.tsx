import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartState } from "./types";
import * as reducers from "./reducers/cart.reducers";

export const CART_FEATURE_KEY = "cart";

export const initialState: CartState = {
  loadingStatus: "loading",
  error: null,
  state: {
    products:[],
    order:0,
    total:0,
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
    setCartOrder: (
      state: CartState,
      action: PayloadAction<any>
    ) => {
      state.state.order = action.payload;
    },
    setCartTotal: (
      state: CartState,
      action: PayloadAction<any>
    ) => {
      state.state.total = action.payload;
    },
    setCartPhone: (
      state: CartState,
      action: PayloadAction<any>
    ) => {
      state.state.phone = action.payload;
    },
    clearState: ( state: CartState,) => {
      state.state.products = []
      state.state.order = 0
      state.state.total = 0
      state.state.phone = ''
    },
    clearPhone: ( state: CartState,) => {
      state.state.phone = ''
    },
    clearOrder: ( state: CartState,) => {
      state.state.order = 0
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
