import {useEffect} from "react";

import {difference, indexOf} from "lodash";
import {useSelector} from "react-redux";

import {commonActions, commonSelectors, useAppDispatch} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";
import {movieService} from "../services";

const useAppBg = () => {
    const genres = useSelector(movieSelectors.getGenres);
    const searchParams = useSelector(commonSelectors.getSearchParams);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        movieService.getGenreList()
            .then(resp => dispatch(movieActions.setGenres(resp.genres)));
    }, [dispatch]);

    const handleClick = (id: number) => {
        if (indexOf(searchParams.with_genres, id) >= 0) {
            dispatch(commonActions.setSearchParams({
                ...searchParams,
                with_genres: [...difference(searchParams.with_genres, [id])]
            }));
        } else {
            dispatch(commonActions.setSearchParams({...searchParams, with_genres: [...searchParams.with_genres, id]}));
        }
    };
    return {genres, searchParams, handleClick};
};

export {useAppBg};