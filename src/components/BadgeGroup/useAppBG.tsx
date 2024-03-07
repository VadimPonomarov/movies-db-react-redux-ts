import {useContext, useEffect, useState} from "react";

import {difference, indexOf} from "lodash";

import {IGenre} from "../../common";
import {AuthContext} from "../../common/hocs";
import {movieService} from "../../common/services";

const useAppBg = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const {searchParams, setSearchParams} = useContext(AuthContext);

    useEffect(() => {
        movieService.getGenreList()
            .then(resp => setGenres(resp.genres));
    }, []);

    const handleClick = (id: number) => {
        if (indexOf(searchParams.with_genres, id) >= 0) {
            setSearchParams({...searchParams, with_genres: [...difference(searchParams.with_genres, [id])]});
        } else {
            setSearchParams({...setSearchParams, with_genres: [...searchParams.with_genres, id]});
        }
    };
    return {genres, searchParams, handleClick};
};

export {useAppBg};