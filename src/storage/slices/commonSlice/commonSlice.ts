import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";

import {ISearchParams} from "../../../common/hocs/interfaces";

import {initialState} from "./constants";

const createSliceWithThunks = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
});

export const commonSlice = createSliceWithThunks({
    name: "commonSlice",
    initialState,
    selectors: {
        getThemeIsDark: state => state.themeIsDark,
        getIsPending: state => state.isPending,
        getIsFetching: state => state.isFetching,
        getIsDrawer: state => state.isDrawer,
        getIsPagination: state => state.isPagination,
        setBackDropImgPath: state => state.backDropImgPath,
        getSearchParams: state => state.searchParams,
    },
    reducers: create => ({
        setThemeToggle: create.reducer((state) => {
            state.themeIsDark = !state.themeIsDark;
        }),
        setIsPending: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isPending = action.payload;
        }),
        setIsPagination: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isPagination = action.payload;
        }),
        setIsFetching: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        }),
        setIsDrawer: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isDrawer = action.payload;
        }),
        setBackDropImgPath: create.reducer((state, action: PayloadAction<string>) => {
            state.backDropImgPath = action.payload;
        }),
        setSearchParams: create.reducer((state, action: PayloadAction<ISearchParams>) => {
            state.searchParams = {...state.searchParams, ...action.payload};
        }),
        setIsCategoryChanged: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isCategoryChanged = action.payload;
        }),
    })
});

export const {
    ...commonActions
} = commonSlice.actions;

export const {
    ...commonSelectors
} = commonSlice.selectors;
