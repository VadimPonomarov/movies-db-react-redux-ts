import {useCallback, useEffect, useMemo, useState} from "react";

import {movieService} from "common/services";
import {MovieCategoryEnum} from "common/types";
import _ from "lodash";
import {useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";

import {commonActions, commonSelectors, useAppDispatch, useAppSelector} from "../../storage";
import {movieActions} from "../../storage/slices/moviesSlice";
import {queryClient} from "../hocs";
import {ISearchParams} from "../hocs/interfaces";

const useAppMoviesEffect = () => {
    const [isMoreActive, setIsMoreActive] = useState(false);
    const {isInit, info, movies: results} =
        useAppSelector(state => state.moviesSlice);
    const [query, setQuery] = useSearchParams({page: "1"});
    const {category} = useParams();
    const params = useSelector(commonSelectors.getSearchParams);
    const {isCategoryChanged} = useAppSelector(state => state.commonSlice);

    const dispatch = useAppDispatch();

    const getFetchService = useMemo(() =>
        category === "discover" ?
            movieService.getDiscoverList :
            movieService.getMovieList, [category]);

    const fetchFunc: () => void =
        useCallback(async () => {
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
            } else {
                dispatch(movieActions.setMovies(_.union(results, responseRes)));
                setIsMoreActive(false);
            }
            dispatch(movieActions.setInfo(responseInfo));
            // eslint-disable-next-line
        }, [category, getFetchService, params]);

    useEffect(() => {
        if (isCategoryChanged) {
            dispatch(
                commonActions.setSearchParams({page: "1"})
            );
        }
    }, [category, dispatch, isCategoryChanged]);

    useEffect(() => {
        fetchFunc();
    }, [fetchFunc]);

    useEffect(() => {
        setQuery({page: params.page});
    }, [params.page, setQuery]);


    const nextPage = () => {
        const nextPage: Partial<ISearchParams> =
            {page: (+query.get("page") + 1).toString()};
        dispatch(commonActions.setSearchParams(nextPage));
    };

    const prevPage = () => {
        const prevPage: Partial<ISearchParams> =
            {page: (+query.get("page") - 1).toString()};
        dispatch(commonActions.setSearchParams(prevPage));
    };

    return {
        isInit,
        info,
        results,
        query,
        setQuery,
        prevPage,
        nextPage,
        page: params.page,
        setIsMoreActive,
    };
};

export {useAppMoviesEffect};