import {useCallback, useEffect, useMemo, useState} from "react";

import {movieService} from "common/services";
import {IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import {useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";

import {commonActions, commonSelectors, useAppDispatch, useAppSelector} from "../../storage";
import {queryClient} from "../hocs";
import {ISearchParams} from "../hocs/interfaces";

const useAppMoviesEffect = () => {
    const [isInit, setIsInit] = useState<boolean>(true);
    const [results, setResults] = useState<IMovieResult[]>([]);
    const [info, setInfo] = useState<IMovieListInfo>();
    const [query, setQuery] = useSearchParams({page: "1"});
    const [isMoreActive, setIsMoreActive] = useState(false);
    const params = useSelector(commonSelectors.getSearchParams);
    const {category} = useParams();
    const {page} = params;
    const {isCategoryChanged} = useAppSelector(state => state.commonSlice);

    const dispatch = useAppDispatch();

    const getFetchService = useMemo(() =>
        category === "discover" ?
            movieService.getDiscoverList :
            movieService.getMovieList, [category]);

    const fetchFunc: () => void =
        useCallback(async () => {
            const {results, ...info} =
                await queryClient.fetchQuery({
                    queryKey: [category, JSON.stringify(params)],
                    queryFn: () =>
                        getFetchService(
                            Object(MovieCategoryEnum)[category],
                            {...params})
                });
            if (!isMoreActive) {
                setResults(results);
            } else {
                setResults((prevState) => [...prevState, ...results]);
                setIsMoreActive(false);
            }
            setInfo(info);

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
        setQuery({page});
    }, [page, setQuery]);


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
        setIsInit,
        info,
        setInfo,
        results,
        setResults,
        query,
        setQuery,
        page,
        prevPage,
        nextPage,
        setIsMoreActive
    };
};

export {useAppMoviesEffect};