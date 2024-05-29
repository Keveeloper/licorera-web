import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import { RootState } from "./types";
import {
  PERSONAL_INFO_FEATURE_KEY,
  personalInfoReducer,
} from "./modules/users/users.slice";
import { STORE_FEATURE_KEY, storeReducer } from "./modules/store/store.slice";
import { PROMOTION_FEATURE_KEY, promotionReducer } from "./modules/promotions/promotions.slice";
import { EXCHANGE_FEATURE_KEY, exchangeReducer } from "./modules/exchangeProducts/exchange.slice";
import { SUGGESTED_FEATURE_KEY, suggestedReducer } from "./modules/suggestedProducts/suggested.slice";
import { CART_FEATURE_KEY, cartReducer } from "./modules/cart/cart.slice";
import { SPONSOR_FEATURE_KEY, sponsorReducer } from "./modules/sponsors/sponsors.slice";
import { CAMPAIGN_FEATURE_KEY, campaignReducer } from "./modules/campaigns/campaigns.slice";
import { NEW_PRODUCTS_FEATURE_KEY, newProductsReducer } from "./modules/newProducts/newProducts.slice";
import { SEARCH_FEATURE_KEY, searchedReducer } from "./modules/search/search.slice";
import { PAYMENT_METHODS_FEATURE_KEY, paymentMethodsReducer } from "./modules/paymentMethods/paymentMethods.slice";
import { ADDRESS_FEATURE_KEY, addressReducer } from "./modules/address";

export const reducer = combineReducers({
  [PERSONAL_INFO_FEATURE_KEY]: personalInfoReducer,
  [PROMOTION_FEATURE_KEY]:promotionReducer,
  [STORE_FEATURE_KEY]: storeReducer,
  [EXCHANGE_FEATURE_KEY]:exchangeReducer,
  [SUGGESTED_FEATURE_KEY]:suggestedReducer,
  [CART_FEATURE_KEY]:cartReducer,
  [SPONSOR_FEATURE_KEY]: sponsorReducer,
  [CAMPAIGN_FEATURE_KEY]: campaignReducer,
  [NEW_PRODUCTS_FEATURE_KEY]: newProductsReducer,
  [SEARCH_FEATURE_KEY]: searchedReducer,
  [PAYMENT_METHODS_FEATURE_KEY]: paymentMethodsReducer,
  [ADDRESS_FEATURE_KEY]: addressReducer,
});

const KEY_PERSIST_CONFIG = "root";

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === `${PERSONAL_INFO_FEATURE_KEY}/clearState`) {
    storage.removeItem(`persist:${KEY_PERSIST_CONFIG}`);
    state = {} as RootState;
  }

  return reducer(state, action);
};

export const persistConfig: PersistConfig<any> = {
  key: KEY_PERSIST_CONFIG,
  storage,
  blacklist: [],
  writeFailHandler: (error) => console.error("storage error:", error),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
  // Optional Redux store enhancers
  // enhancers: [],
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
