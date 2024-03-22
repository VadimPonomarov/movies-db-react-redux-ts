import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";

import {MovieCategoryEnum} from "../../../common";
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
        getIsLoading: state => state.isLoading,
        getIsSuccess: state => state.isSuccess,
        getIsError: state => state.isError,
        getIsDrawer: state => state.isDrawer,
        getIsPagination: state => state.isPagination,
        setBackDropImgPath: state => state.backDropImgPath,
        getSearchParams: state => state.searchParams,
        getCurrentCategory: state => state.currentCategory,

    },
    reducers: create => ({
        setThemeToggle: create.reducer((state) => {
            state.themeIsDark = !state.themeIsDark;
        }),
        setIsLoading: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }),
        setIsSuccess: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isSuccess = action.payload;
        }),
        setIsError: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        }),
        setIsPagination: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isPagination = action.payload;
        }),
        setIsDrawer: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isDrawer = action.payload;
        }),
        setBackDropImgPath: create.reducer((state, action: PayloadAction<string>) => {
            state.backDropImgPath = action.payload;
        }),
        setSearchParams: create.reducer((state, action: PayloadAction<Partial<ISearchParams>>) => {
            state.searchParams = {...state.searchParams, ...action.payload};
        }),
        setIsCategoryChanged: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isCategoryChanged = action.payload;
        }),
        setCurrentCategory: create.reducer((state, action: PayloadAction<MovieCategoryEnum>) => {
            state.currentCategory = action.payload;
        }),
    })
});

export const {
    ...commonActions
} = commonSlice.actions;

export const {
    ...commonSelectors
} = commonSlice.selectors;
