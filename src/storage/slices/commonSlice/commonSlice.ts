import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";

import {initialAlertInfo, initialState} from "./constants";
import {IAlertInfo, ThemeType} from "./interfaces";
import {ISearchParams} from "../../../common/hocs/interfaces";

const createSliceWithThunks = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
});

const commonSlice = createSliceWithThunks({
    name: "commonSlice",
    initialState,
    selectors: {
        getThemeIsDark: state => state.themeIsDark,
        getIsPending: state => state.isPending,
        getIsFetching: state => state.isFetching,
        getIsDrawer: state => state.isDrawer,
        setBackDropImgPath: state => state.backDropImgPath,
        getSearchParams: state => state.searchParams,
        getAlertInfo: state => state.alertInfo,
    },
    reducers: create => ({
        setThemeToggle: create.reducer((state) => {
            state.themeIsDark = !state.themeIsDark;
        }),
        setIsPending: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isPending = action.payload;
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
            state.searchParams = action.payload;
        }),
        setAlertInfo: create.reducer((state, action: PayloadAction<IAlertInfo>) => {
            state.alertInfo = action.payload;
            setTimeout(() => {
                state.alertInfo = initialAlertInfo;
            }, 5 * 1000);
        }),
    })
});

export const {
    ...commonActions
} = commonSlice.actions;

export const {
    ...commonSelectors
} = commonSlice.selectors;

export default commonSlice.reducer;
