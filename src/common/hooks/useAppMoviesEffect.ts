import {useContext, useEffect, useState} from "react";

import {movieService} from "common/services";
import {IMovieListInfo, IMovieResult, MovieCategoryEnum} from "common/types";
import {useParams, useSearchParams} from "react-router-dom";

import {AuthContext} from "../hocs";
import {commonSelectors, useAppDispatch} from "../../storage";
import {useSelector} from "react-redux";

const useAppMoviesEffect = () => {
    const [results, setResults] = useState<IMovieResult[]>([]);
    const [info, setInfo] = useState<IMovieListInfo>();
    const [query, setQuery] = useSearchParams({page: "1"});
    const searchParams = useSelector(commonSelectors.getSearchParams);
    const page = parseInt(query.get("page"));
    const {category} = useParams();
    const dispatch = useAppDispatch();

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