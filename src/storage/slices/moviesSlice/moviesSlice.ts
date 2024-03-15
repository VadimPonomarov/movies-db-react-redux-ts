import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";

import {IGenre, IMovieListInfo, IMovieResult} from "../../../common";

import {initialState} from "./constants";


const createSliceWithThunks = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
});


export const moviesSlice = createSliceWithThunks({
    name: "moviesSlice",
    initialState,
    selectors: {
        getIsInit: state => state.isInit,
        getInfo: state => state.info,
        getMovies: state => state.movies,
        getGenres: state => state.genres,
    },
    reducers: create => ({
        setIsInit: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isInit = action.payload;
        }),
        setMovies: create.reducer((state, action: PayloadAction<IMovieResult[]>) => {
            state.movies = action.payload;
        }),
        setInfo: create.reducer((state, action: PayloadAction<IMovieListInfo>) => {
            state.info = action.payload;
        }),
        setGenres: create.reducer((state, action: PayloadAction<IGenre[]>) => {
            state.genres = action.payload;
        }),
    }),
});


export const {
    ...movieActions
} = moviesSlice.actions;
export const {
    ...movieSelectors
} = moviesSlice.selectors;

