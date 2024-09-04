import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import UserReducer from "./slices/UserSlice";
import LoaderReducer from "./slices/LoaderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};

const combine_Reducers = combineReducers({
  user: UserReducer,
  loader: LoaderReducer,
});
const persist_Reducer = persistReducer(persistConfig, combine_Reducers);

const Store = configureStore({
  reducer: {
    reducer: persist_Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export default Store;
