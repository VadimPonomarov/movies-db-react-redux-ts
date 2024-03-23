import {useCallback, useDeferredValue, useEffect, useMemo, useState} from "react";

import {movieService} from "common/services";
import {IMovieList, IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import _ from "lodash";
import {useSelector} from "react-redux";
import {SetURLSearchParams, useParams, useSearchParams} from "react-router-dom";

import {commonActions, commonSelectors, useAppDispatch, useAppSelector} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";
import {queryClient} from "../hocs";
import {ISearchParams} from "../hocs/interfaces";

interface IReturn {
    isInit: boolean,
    info: IMovieListInfo,
    getFilteredResults: IMovieResult[],
    query: URLSearchParams,
    setQuery: SetURLSearchParams,
    prevPage: () => void,
    nextPage: () => void,
    page: string,
    handleClickMore: () => void,
    getChoicesFromCache: () => IMovieResult[]
}

const useAppMoviesEffect: () => IReturn =
    () => {
        const [isMoreActive, setIsMoreActive] =
            useState<boolean>(false);
        const {isInit, info, movies: results, movieSearchInTitleLocal} =
            useAppSelector(state =>
                state.moviesSlice);
        const [query, setQuery] =
            useSearchParams({page: "1"});
        const {category} =
            useParams();
        const params =
            useSelector(commonSelectors.getSearchParams);
        const {with_genres, sort_by} =
            useSelector(commonSelectors.getSearchParams);
        const choices =
            useSelector(movieSelectors.getActiveCardList);
        const {isCategoryChanged} =
            useAppSelector(state => state.commonSlice);

        const dispatch = useAppDispatch();

        const getFilteredResults = useMemo(
            () => {
                if (!with_genres.length) return results;
                if (sort_by) {
                    const [sortBy, direction] =
                        sort_by
                            .split(".");
                    const sortFunc = () =>
                        !movieSearchInTitleLocal ?
                            _.sortBy(
                                results
                                    .filter(item =>
                                        !!_.intersection(
                                            item.genre_ids,
                                            with_genres
                                        )
                                            .length
                                    ),

                                [category !== "discover" && sortBy]
                            ) :
                            _.sortBy(
                                results
                                    .filter(item =>
                                        !!_.intersection(
                                            item.genre_ids,
                                            with_genres
                                        )
                                            .length
                                    )
                                    .filter(item =>
                                        item.title.toLowerCase()
                                            .match(
                                                movieSearchInTitleLocal
                                                    .toLowerCase()
                                                    .trim())
                                    ),

                                [category !== "discover" && sortBy]
                            );


                    if (direction === "asc") return sortFunc();
                    return sortFunc()
                        .reverse();
                }
                return results;

            }, [category, movieSearchInTitleLocal, results, sort_by, with_genres]);


        const nextPage: () => void =
            () => {
                const nextPage: ISearchParams =
                    {
                        page: (+query.get("page") + 1)
                            .toString()
                    };
                dispatch(
                    commonActions.setSearchParams(nextPage)
                );
            };

        const prevPage: () => void =
            () => {
                const prevPage: ISearchParams =
                    {page: (+query.get("page") - 1).toString()};
                dispatch(
                    commonActions.setSearchParams(prevPage)
                );
            };
        const handleClickMore: () => void =
            () => {
                setIsMoreActive(true);
                nextPage();
            };

        const getFetchService: (category: MovieCategoryEnum,
                                params: Partial<ISearchParams>) => Promise<IMovieList> =
            useMemo(() =>
                category === "discover" ?
                    movieService.getDiscoverList :
                    movieService.getMovieList, [category]);

        const fetchFunc: () => void =
            useCallback(async () => {
                dispatch(
                    commonActions.setIsLoading(true)
                );
                const {results: responseRes, ...responseInfo} =
                    await queryClient.fetchQuery({
                        queryKey: [category, JSON.stringify(params)],
                        queryFn: () =>
                            getFetchService(
                                Object(MovieCategoryEnum)[category],
                                {...params})
                    });
                if (!isMoreActive) {
                    dispatch(
                        movieActions.setMovies(responseRes)
                    );
                    dispatch(
                        movieActions.setInfo({...responseInfo, total_results: 0})
                    );

                } else {
                    dispatch(movieActions
                        .setMovies(
                            _.uniqBy(
                                _.union(
                                    results,
                                    responseRes
                                ),
                                "id"
                            )
                        )
                    );
                    setIsMoreActive(false);
                    dispatch(movieActions.setInfo(responseInfo));
                }
                dispatch(commonActions.setIsLoading(false));
                // eslint-disable-next-line
            }, [category, getFetchService, params]);
        const getChoicesFromCache: () => IMovieResult[] =
            () => {
                const {results} =
                    queryClient
                        .getQueryData<IMovieList>(
                            [category, JSON.stringify(params)]
                        );
                return results
                    .filter(item =>
                        !!_.includes(choices, item.id));
            };


        useEffect(() => {
            if (isCategoryChanged) {
                dispatch(
                    commonActions.setSearchParams({page: "1"})
                );
            }
        }, [category, dispatch, isCategoryChanged]);


        const deferredFetchFunc = useDeferredValue(fetchFunc);

        useEffect(() => {
            deferredFetchFunc();
        }, [deferredFetchFunc]);

        useEffect(() => {
            setQuery({page: params.page});
        }, [params.page, setQuery]);

        useEffect(() => {
            if (!info?.total_results)
                window.scrollTo(0, 0);
        }, [info]);


        return {
            isInit,
            info,
            getFilteredResults,
            query,
            setQuery,
            prevPage,
            nextPage,
            page: params.page,
            handleClickMore,
            getChoicesFromCache
        };
    };

export {useAppMoviesEffect};