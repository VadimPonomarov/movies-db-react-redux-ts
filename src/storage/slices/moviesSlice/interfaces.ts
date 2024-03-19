import {IGenre, IMovieDetails, IMovieListInfo, IMovieResult} from "../../../common";

export interface IInitialState {
    isInit: boolean,
    info: IMovieListInfo,
    movieDetails?: IMovieDetails,
    movies: IMovieResult[],
    genres: IGenre[],
    activeCardList: number[],
    loading: boolean;
    error: string | null;
}

