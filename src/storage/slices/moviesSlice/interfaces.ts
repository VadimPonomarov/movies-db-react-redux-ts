import {IGenre, IMovieDetails, IMovieListInfo, IMovieResult} from "../../../common";

export interface IInitialState {
    isInit: boolean,
    info: IMovieListInfo,
    movies: IMovieResult[],
    movieDetails?: IMovieDetails,
    genres: IGenre[],
    activeCardList: number[],
    loading: boolean;
    error: string | null;
}

