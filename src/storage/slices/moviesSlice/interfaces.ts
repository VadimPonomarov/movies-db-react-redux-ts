import {IGenre, IMovieListInfo, IMovieResult} from "../../../common";

export interface IInitialState {
    showChoices: boolean,
    isInit: boolean,
    info: IMovieListInfo,
    movies: IMovieResult[],
    moviesFiltered?: IMovieResult[],
    genres: IGenre[],
    activeCardList: number[],
    loading: boolean;
    error: string | null;
}

