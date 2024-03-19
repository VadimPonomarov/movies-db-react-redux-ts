import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";

import {IGenre, IGenreListResponse, IMovieDetails, IMovieListInfo, IMovieResult} from "../../../common";
import {movieService} from "../../../common/services";

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
        getMovieDetails: state => state.movieDetails,
        getGenres: state => state.genres,
        getActiveCardList: state => state.activeCardList,
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
        toggleActiveCardList: create.reducer((state, action: PayloadAction<number>) => {
            if (_.includes(state.activeCardList, action.payload)) {
                state.activeCardList = _.difference(state.activeCardList, [action.payload]);
                return;
            }
            state.activeCardList = _.union(state.activeCardList, [action.payload]);
        }),
        cleanActiveCardList: create.reducer((state) => {
            state.activeCardList = [];
        }),
        cleanMovieDetails: create.reducer((state) => {
            state.movieDetails = undefined;
        }),
        fetchMovieDetails: create.asyncThunk<IMovieDetails, number>(
            async (id, {fulfillWithValue, rejectWithValue}) => {
                const res = await movieService.getMovieById(id);
                if (!res) {
                    return rejectWithValue("Error message !");
                }
                return fulfillWithValue(res);
            },
            {
                pending: state => {
                    state.loading = true;
                    state.error = null;
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
                },
                fulfilled: (state, action) => {
                    state.movieDetails = action.payload;
                    state.error = null;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        getGenreList: create.asyncThunk<IGenreListResponse, void>(
            async (_, {fulfillWithValue, rejectWithValue}) => {
                const res = await movieService.getGenreList();
                if (!res) {
                    return rejectWithValue("Error message !");
                }
                return fulfillWithValue(res);
            },
            {
                pending: state => {
                    state.loading = true;
                    state.error = null;
                },
                rejected: (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || null;
                },
                fulfilled: (state, action) => {
                    state.genres = action.payload.genres;
                    state.error = null;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    }),
});


export const {
    ...movieActions
} = moviesSlice.actions;
export const {
    ...movieSelectors
} = moviesSlice.selectors;

