import {useEffect} from "react";

import {difference, indexOf} from "lodash";
import {useSelector} from "react-redux";

import {commonActions, commonSelectors, useAppDispatch} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";
import {ISearchParams} from "../hocs/interfaces";
import {IGenre} from "../types";

interface IReturn {
    genres: IGenre[],
    searchParams: ISearchParams,
    handleClick: (id: number) => void
}

const useAppBg: () => IReturn =
    () => {
        const genres = useSelector(movieSelectors.getGenres);
        const searchParams = useSelector(commonSelectors.getSearchParams);
        const dispatch = useAppDispatch();

        useEffect(() => {
            dispatch(movieActions.getGenreList(searchParams));
        }, [dispatch, searchParams]);

        const handleClick: (id: number) => void =
            (id) => {
                if (indexOf(searchParams.with_genres, id) >= 0) {
                    dispatch(commonActions.setSearchParams({
                        ...searchParams,
                        with_genres: [...difference(searchParams.with_genres, [id])]
                    }));
                } else {
                    dispatch(commonActions.setSearchParams({
                        ...searchParams,
                        with_genres: [...searchParams.with_genres, id]
                    }));
                }
            };
        return {genres, searchParams, handleClick};
    };

export {useAppBg};