import {urls} from "../constants";
import {ISearchParams} from "../hocs/interfaces";
import {AuthSessionIdResponseType, IGenreListResponse, IMovieDetails, IMovieList, MovieCategoryEnum} from "../types";

import {apiService} from "./apiService";

const movieService = {
    getSessionId: (): Promise<AuthSessionIdResponseType> =>
        apiService.get(urls.auth.sessionId)
            .then(({data}) => data),

    getMovieList: (category: MovieCategoryEnum = MovieCategoryEnum.popular,
                   params: ISearchParams): Promise<IMovieList> =>
        apiService.get(urls.list.getList(category), {params})
            .then(({data}) => data),

    getMovieById: (id: number, params: ISearchParams): Promise<IMovieDetails> =>
        apiService.get(urls.getMovieById(id), {params})
            .then(({data}) => data),

    getGenreList: (): Promise<IGenreListResponse> =>
        apiService.get(urls.list.genreList)
            .then(({data}) => data),

    getDiscoverList: (category: MovieCategoryEnum = MovieCategoryEnum.discover,
                      params: Partial<ISearchParams>): Promise<IMovieList> =>
        apiService.get(urls.list.discoverList, {params})
            .then(({data}) => data),

    postRating: (movieId: number, bodyParams: { value: number | null },
                 guest_session_id: string): Promise<any> =>
        apiService.post(urls.getRatingById(movieId), bodyParams, {
            params: {
                guest_session_id
            }
        })
            .then(({data}) => data),
};
export {movieService};