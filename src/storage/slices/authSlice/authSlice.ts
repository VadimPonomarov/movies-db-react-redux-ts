import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";

import {commonActions} from "../commonSlice";

import {initialState} from "./constants";


const createSliceWithThunks = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
});


export const authSlice = createSliceWithThunks({
    name: "authSlice",
    initialState,
    selectors: {
        getUserName: state => state.userName,
        getIsAuth: state => state.isAuth,
        getIsInit: state => state.isInit,
    },
    reducers: (create) => ({
        setUserName: create.reducer((state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        }),
        setIsAuth: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        }),
        setIsInit: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isInit = action.payload;
        }),
        logOut: create.asyncThunk<void, void>(
            async (_, {dispatch}) => {
                dispatch(commonActions.setSearchParams({page: "1"}));
                dispatch(authActions.setIsInit(true));
                dispatch(authActions.setIsAuth(false));
            })
    }),
});


export const {
    ...authActions
} = authSlice.actions;

export const {
    ...authSelectors
} = authSlice.selectors;

