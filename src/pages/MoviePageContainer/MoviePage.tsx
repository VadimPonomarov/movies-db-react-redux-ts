import * as React from "react";
import {FC, memo, useEffect, useState} from "react";

import {useParams} from "react-router-dom";

import {IMovieDetails} from "../../common";
import {movieService} from "../../common/services";
import {useAppDispatch} from "../../storage";

import {IProps} from "./interfaces";
import {MovieDetailsCard} from "./MovieDetailsCard";


const MoviePage_: FC<IProps> = () => {
    const {movieId} = useParams();
    const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (movieId) {
            movieService.getMovieById(+movieId)
                .then(details => setMovieDetails(details));
        }
    }, [dispatch, movieId]);

    return (
        <>
            {movieDetails &&
                <MovieDetailsCard
                    props={{movieDetails}}
                />
            }
        </>
    );
};

export const MoviePage = memo(MoviePage_);