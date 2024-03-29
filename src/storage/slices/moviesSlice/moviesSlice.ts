import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";

import {IGenre, IMovieDetails, IMovieListInfo, IMovieResult} from "../../../common";
import {movieService} from "../../../common/services";
import {commonActions} from "../commonSlice";

import {initialState} from "./constants";

const createSliceWithThunks = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
});


export const moviesSlice = createSliceWithThunks({
    name: "moviesSlice",
    initialState,
    selectors: {
        getShowChoices: state => state.showChoices,
        getIsInit: state => state.isInit,
        getInfo: state => state.info,
        getMovies: state => state.movies,
        getMovieSearchInTitleLocal: state => state.movieSearchInTitleLocal,
        getGenres: state => state.genres,
        getActiveCardList: state => state.activeCardList,
    },
    reducers: create => ({
        setShowChoices: create.reducer((state, action: PayloadAction<boolean>) => {
            state.showChoices = action.payload;
        }),
        setIsInit: create.reducer((state, action: PayloadAction<boolean>) => {
            state.isInit = action.payload;
        }),
        setMovies: create.reducer((state, action: PayloadAction<IMovieResult[]>) => {
            state.movies = action.payload;
        }),
        setMovieSearchInTitleLocal: create.reducer((state, action: PayloadAction<string>) => {
            state.movieSearchInTitleLocal = action.payload;
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
        sendMovieRating: create.asyncThunk<IMovieDetails, { id: number, value: number }>(
            async ({id, value},
                   {dispatch, fulfillWithValue, rejectWithValue}) => {
                try {
                    dispatch(commonActions.setIsLoading(true));
                    const res =
                        await movieService
                            .getSessionId()
                            .then(({guest_session_id}) =>
                                movieService
                                    .postRating(
                                        id,
                                        {value},
                                        guest_session_id
                                    )
                            );
                    dispatch(commonActions.setIsSuccess(true));
                    return fulfillWithValue(res);
                } catch (e) {
                    dispatch(commonActions.setIsError(e.message));
                    return rejectWithValue(e);
                } finally {
                    dispatch(commonActions.setIsLoading(false));
                }
            }
        ),
    }),
});


export const {
    ...movieActions
} = moviesSlice.actions;
export const {
    ...movieSelectors
} = moviesSlice.selectors;

