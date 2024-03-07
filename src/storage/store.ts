import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import {createTransform, persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import commonSlice from "./slices/common/commonSlice";

const rootReducer = combineReducers({
    common: commonSlice,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {warnAfter: 300},
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',

});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
