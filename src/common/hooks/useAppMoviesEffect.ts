import {useCallback, useEffect, useState} from "react";

import {movieService} from "common/services";
import {IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import {useParams, useSearchParams} from "react-router-dom";

import {commonSelectors} from "../../storage";
import {useSelector} from "react-redux";
import {queryClient} from "../hocs";

const useAppMoviesEffect = () => {
    const [results, setResults] = useState<IMovieResult[]>([]);
    const [info, setInfo] = useState<IMovieListInfo>();
    const [query, setQuery] = useSearchParams({page: "1"});
    const searchParams = useSelector(commonSelectors.getSearchParams);
    const page = parseInt(query.get("page"));

    const {category} = useParams();

    const fetchFunc: () => void =
        useCallback(async () => {
            if (category === "discover") {
                const {results, ...info} =
                    await queryClient.fetchQuery({
                        queryKey: [category, page],
                        queryFn: () => movieService.getDiscoverList(Object(MovieCategoryEnum)[category], page,
                            {
                                ...searchParams,
                                with_genres: searchParams.with_genres.join(",")
                            })
                    });
                setResults(results);
                setInfo(info);

            } else {
                const {results, ...info} =
                    await queryClient.fetchQuery({
                        queryKey: [category, page],
                        queryFn: () => movieService.getMovieList(Object(MovieCategoryEnum)[category], page)
                    });
                setResults(results);
                setInfo(info);
            }

        }, [category, page, searchParams]);

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

    return {info, setInfo, results, setResults, query, setQuery, page, prevPage, nextPage};
};

export {useAppMoviesEffect};