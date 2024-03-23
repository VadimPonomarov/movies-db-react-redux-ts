import * as React from "react";
import {useEffect} from "react";

import _, {difference, indexOf} from "lodash";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {commonActions, commonSelectors, useAppDispatch} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";
import {ISearchParams} from "../hocs/interfaces";
import {IGenre} from "../types";

interface IReturn {
    genres: IGenre[],
    searchParams: ISearchParams,
    handleClick: (id: number) => void,
    handleChange: () => void;
    checked: boolean;
}

const useAppBg: () => IReturn =
    () => {
        const [checked, setChecked] =
            React.useState<boolean>(true);
        const genres =
            useSelector(movieSelectors.getGenres);
        const searchParams =
            useSelector(commonSelectors.getSearchParams);
        const dispatch =
            useAppDispatch();
        const navigate = useNavigate();

        const handleChange = () => {
            dispatch(commonActions.setSearchParams({
                ...searchParams,
                with_genres:
                    _.difference(
                        genres
                            .map(item => item.id),
                        searchParams.with_genres
                    )
            }));
            setChecked(!checked);
        };


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
        return {genres, searchParams, handleClick, handleChange, checked};
    };

export {useAppBg};