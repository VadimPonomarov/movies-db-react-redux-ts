import {IInitialState} from "./interfaces";

export const initialState: IInitialState = {
    showChoices: false,
    isInit: true,
    info: undefined,
    movies: [],
    genres: [],
    activeCardList: [],
    loading: false,
    error: null,
};