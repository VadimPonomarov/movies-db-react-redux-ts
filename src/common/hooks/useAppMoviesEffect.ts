import {useCallback, useDeferredValue, useEffect, useMemo, useState} from "react";

import {movieService} from "common/services";
import {IMovieList, IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import _ from "lodash";
import {useSelector} from "react-redux";
import {SetURLSearchParams, useParams, useSearchParams} from "react-router-dom";

import {commonActions, commonSelectors, useAppDispatch, useAppSelector} from "../../storage";
import {movieActions} from "../../storage/slices/moviesSlice";
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
}

const useAppMoviesEffect: () => IReturn =
    () => {
        const [isMoreActive, setIsMoreActive] =
            useState<boolean>(false);
        const {isInit, info, movies: results} =
            useAppSelector(state => state.moviesSlice);
        const [query, setQuery] =
            useSearchParams({page: "1"});
        const {category} =
            useParams();
        const params =
            useSelector(commonSelectors.getSearchParams);
        const {with_genres} =
            useSelector(commonSelectors.getSearchParams);
        const {isCategoryChanged} =
            useAppSelector(state => state.commonSlice);

        const dispatch = useAppDispatch();

        const getFilteredResults = useMemo(() => {
            if (!with_genres.length) return results;
            return results
                .filter(item =>
                    !!_.intersection(item.genre_ids, with_genres).length
                );
        }, [results, with_genres]);


        const nextPage: () => void =
            () => {
                const nextPage: ISearchParams =
                    {page: (+query.get("page") + 1).toString()};
                dispatch(commonActions.setSearchParams(nextPage));
            };

        const prevPage: () => void =
            () => {
                const prevPage: ISearchParams =
                    {page: (+query.get("page") - 1).toString()};
                dispatch(commonActions.setSearchParams(prevPage));
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
                dispatch(commonActions.setIsLoading(true));
                const {results: responseRes, ...responseInfo} =
                    await queryClient.fetchQuery({
                        queryKey: [category, JSON.stringify(params)],
                        queryFn: () =>
                            getFetchService(
                                Object(MovieCategoryEnum)[category],
                                {...params})
                    });
                if (!isMoreActive) {
                    dispatch(movieActions.setMovies(responseRes));
                    dispatch(movieActions.setInfo({...responseInfo, total_results: 0}));

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
            handleClickMore
        };
    };

export {useAppMoviesEffect};