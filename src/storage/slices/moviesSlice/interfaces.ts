import {IGenre, IMovieListInfo, IMovieResult} from "../../../common";

export interface IInitialState {
    showChoices: boolean,
    isInit: boolean,
    info: IMovieListInfo,
    movies: IMovieResult[],
    movieSearchInTitleLocal?: string,
    genres: IGenre[],
    activeCardList: number[],
    loading: boolean;
    error: string | null;
}

