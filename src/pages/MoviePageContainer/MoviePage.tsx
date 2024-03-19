import * as React from "react";
import {FC, memo, useEffect} from "react";

import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";

import {IProps} from "./interfaces";
import {MovieDetailsCard} from "./MovieDetailsCard";


const MoviePage_: FC<IProps> = () => {
    const {movieId} = useParams();
    const movieDetails = useSelector(movieSelectors.getMovieDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (movieId) {
            dispatch(movieActions.fetchMovieDetails(+movieId));
        }
        return () => {
            dispatch(movieActions.cleanMovieDetails());
        };
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