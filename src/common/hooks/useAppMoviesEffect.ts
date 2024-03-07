import {useContext, useEffect, useState} from "react";

import {movieService} from "common/services";
import {IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import {useParams, useSearchParams} from "react-router-dom";

import {AuthContext} from "../hocs";

const useAppMoviesEffect = () => {
    const [results, setResults] = useState<IMovieResult[]>([]);
    const [info, setInfo] = useState<IMovieListInfo>();
    const [query, setQuery] = useSearchParams({page: "1"});
    const {searchParams} = useContext(AuthContext);
    const page = parseInt(query.get("page"));
    const {category} = useParams();


    useEffect(() => {
        setQuery({page: "1"});
        // eslint-disable-next-line
    }, [category]);

    useEffect(() => {
        if (category === "discover") {
            movieService.getDiscoverList(Object(MovieCategoryEnum)[category], page,
                {...searchParams, with_genres: searchParams.with_genres.join(",")})
                .then(({results, ...info}) => {
                    setResults(results);
                    setInfo(info);
                });
        } else {
            movieService.getMovieList(Object(MovieCategoryEnum)[category], page)
                .then(({results, ...info}) => {
                    setResults(results);
                    setInfo(info);
                });
        }

    }, [page, category, searchParams]);


    const nextPage = () => {
        setQuery({page: (+query.get("page") + 1).toString()});
    };

    const prevPage = () => {
        setQuery({page: (+query.get("page") - 1).toString()});
    };

    return {info, setInfo, results, setResults, query, setQuery, prevPage, nextPage};
};

export {useAppMoviesEffect};