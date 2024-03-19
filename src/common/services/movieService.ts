import {urls} from "../constants";
import {ISearchParams} from "../hocs/interfaces";
import {AuthSessionIdResponseType, IGenreListResponse, IMovieDetails, IMovieList, MovieCategoryEnum} from "../types";

import {apiService} from "./apiService";

const movieService = {
    getSessionId: (): Promise<AuthSessionIdResponseType> =>
        apiService.get(urls.auth.sessionId)
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getMovieList: (category: MovieCategoryEnum = MovieCategoryEnum.popular, params: Partial<ISearchParams>): Promise<IMovieList> =>
        apiService.get(urls.list.getList(category), {params})
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getMovieById: (id: number): Promise<IMovieDetails> =>
        apiService.get(urls.getMovieById(id))
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getGenreList: (): Promise<IGenreListResponse> =>
        apiService.get(urls.list.genreList)
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getDiscoverList: (category: MovieCategoryEnum = MovieCategoryEnum.discover,
                      params: Partial<ISearchParams>): Promise<IMovieList> =>
        apiService.get(urls.list.discoverList, {params})
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    postRating: (movieId: number, bodyParams: { value: number | null }, guest_session_id: string)
        : Promise<any> =>
        apiService.post(urls.getRatingById(movieId), bodyParams, {
            params: {
                guest_session_id
            }
        })
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
};
export {movieService};