import {Action, combineReducers, configureStore, ThunkAction,} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import {authSlice} from "./slices/authSlice";
import {commonSlice} from "./slices/commonSlice";
import {moviesSlice} from "./slices/moviesSlice";


const rootReducer = combineReducers({
    commonSlice: commonSlice.reducer,
    authSlice: authSlice.reducer,
    moviesSlice: moviesSlice.reducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {warnAfter: 300},
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== "production",

});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;