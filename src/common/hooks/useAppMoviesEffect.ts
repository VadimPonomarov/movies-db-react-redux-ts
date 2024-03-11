import {useCallback, useEffect, useState} from "react";

import {movieService} from "common/services";
import {IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import {useSelector} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";

import {commonSelectors} from "../../storage";
import {queryClient} from "../hocs";

const useAppMoviesEffect = () => {
    const [isInit, setIsInit] = useState<boolean>(true);
    const [results, setResults] = useState<IMovieResult[]>([]);
    const [info, setInfo] = useState<IMovieListInfo>();
    const [query, setQuery] = useSearchParams({page: "1"});
    const searchParams = useSelector(commonSelectors.getSearchParams);
    const page = parseInt(query.get("page"));
    const {language} = useSelector(commonSelectors.getSearchParams);
    const {category} = useParams();

    const fetchFunc: () => void =
        useCallback(async () => {
            const {results, ...info} =
                await queryClient.fetchQuery({
                    queryKey: [language, category, page],
                    queryFn: () =>
                        movieService
                            .getDiscoverList(Object(MovieCategoryEnum)[category], page,
                                {
                                    ...searchParams,
                                    with_genres: searchParams.with_genres.join(",")
                                })
                });
            setResults(results);
            setInfo(info);

        }, [category, page, searchParams, language]);

    useEffect(() => {
        setQuery({page: "1"});
        // eslint-disable-next-line
    }, [category]);

    useEffect(() => {
        fetchFunc();
    }, [fetchFunc]);


    const nextPage = () => {
        setQuery({page: (+query.get("page") + 1).toString()});
    };

    const prevPage = () => {
        setQuery({page: (+query.get("page") - 1).toString()});
    };

    return {isInit, setIsInit, info, setInfo, results, setResults, query, setQuery, page, prevPage, nextPage};
};

export {useAppMoviesEffect};