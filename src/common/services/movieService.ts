import _ from "lodash";

import {myHttpUrls} from "../constants";
import {ISearchParams} from "../hocs/interfaces";
import {AuthSessionIdResponseType, IGenreListResponse, IMovieDetails, IMovieList, MovieCategoryEnum} from "../types";

import {apiService} from "./apiService";

const movieService = {
    getSessionId: (): Promise<AuthSessionIdResponseType> =>
        apiService.get(myHttpUrls.auth.sessionId)
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getMovieList: (category: MovieCategoryEnum = MovieCategoryEnum.popular, params: Partial<ISearchParams>): Promise<IMovieList> =>
        apiService.get(myHttpUrls.list.getList(category), {params})
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getMovieById: (id: number): Promise<IMovieDetails> =>
        apiService.get(myHttpUrls.getMovieById(id))
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getGenreList: (): Promise<IGenreListResponse> =>
        apiService.get(myHttpUrls.list.genreList)
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    getDiscoverList: (category: MovieCategoryEnum = MovieCategoryEnum.discover,
                      params: Partial<ISearchParams>): Promise<IMovieList> =>
        apiService.get(myHttpUrls.list.discoverList, {params})
            .then(({data}) => data)
            .catch((error) => {
                console.log(error);
            }),
    postRating: (movieId: number, bodyParams: { value: number | null }, guest_session_id: string)
        : Promise<any> =>
        apiService.post(myHttpUrls.getRatingById(movieId), bodyParams, {
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