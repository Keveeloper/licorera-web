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

export const reducer = combineReducers({
  [PERSONAL_INFO_FEATURE_KEY]: personalInfoReducer,
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
