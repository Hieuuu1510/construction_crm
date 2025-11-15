import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import storage from "redux-persist/lib/storage"; // storage dùng để lưu vào localStorage (web)
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: [authSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // bọc persistReducer cho rootReducer để lưu trong localStorage

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    });
    // Tắt serializableCheck vì redux-persist lưu thêm nhiều non-serializable object
    return middlewares;
  },
});
// configureStore giúp tự động thêm Redux DevTools + middleware cần thiết

export const persistor = persistStore(store); // persistor để dùng cho PersistGate để delay UI

export default store;
