import {IGenre, IMovieListInfo, IMovieResult} from "../../../common";

export interface IInitialState {
    isInit: boolean,
    info: IMovieListInfo,
    movies: IMovieResult[],
    genres: IGenre[],
    activeCardList: number[],
    loading: boolean;
    error: string | null;
}

