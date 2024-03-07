import * as React from "react";
import {FC, useEffect, useState} from "react";

import {useParams} from "react-router-dom";

import {IMovieDetails} from "../../common";
import {movieService} from "../../common/services";

import {IProps} from "./interfaces";
import {MovieDetailsCard} from "./MovieDetailsCard";


const MoviePage: FC<IProps> = () => {
    const {movieId} = useParams();
    const [movieDetails, setMovieDetails] = useState<IMovieDetails>();

    useEffect(() => {
        if (movieId) {
            movieService.getMovieById(+movieId)
                .then(details => setMovieDetails(details));
        }

    }, [movieId]);

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

export {MoviePage};