import {useEffect, useState} from "react";

import {difference, indexOf} from "lodash";
import {useSelector} from "react-redux";

import {IGenre} from "../../common";
import {movieService} from "../../common/services";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

const useAppBg = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const searchParams = useSelector(commonSelectors.getSearchParams)
    const dispatch = useAppDispatch()
    useEffect(() => {
        movieService.getGenreList()
            .then(resp => setGenres(resp.genres));
    }, []);

    const handleClick = (id: number) => {
        if (indexOf(searchParams.with_genres, id) >= 0) {
            dispatch(commonActions.setSearchParams({...searchParams, with_genres: [...difference(searchParams.with_genres, [id])]}));
        } else {
            dispatch(commonActions.setSearchParams({...searchParams,  with_genres: [...searchParams.with_genres, id]}));
        }
    };
    return {genres, searchParams, handleClick};
};

export {useAppBg};