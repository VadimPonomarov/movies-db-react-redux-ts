import * as React from "react";
import {FC, memo, useEffect} from "react";

import {useQuery} from "react-query";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {movieService} from "../../common/services";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

import {IProps} from "./interfaces";
import {MovieDetailsCard} from "./MovieDetailsCard";


const MoviePage_: FC<IProps> = () => {
    const {movieId} = useParams();
    const searchParams = useSelector(commonSelectors.getSearchParams);
    const dispatch = useAppDispatch();

    const {
        isError,
        isLoading,
        isFetching,
        isFetched,
        isSuccess,
        data: movieDetails,
    } = useQuery({
        queryKey: ["movieDetails", movieId, searchParams],
        queryFn: () =>
            movieService.getMovieById(+movieId, searchParams)
    });

    useEffect(() => {
        if (isLoading || isFetching) {
            dispatch(commonActions.setIsLoading(true));
            dispatch(commonActions.setIsError(false));
        } else if (isError) {
            dispatch(commonActions.setIsLoading(false));
            dispatch(commonActions.setIsError(true));
        } else if (isFetched || isSuccess) {
            dispatch(commonActions.setIsLoading(false));
            dispatch(commonActions.setIsError(false));
        }

    }, [isError, isLoading, isFetching, isFetched, isSuccess, dispatch, searchParams]);

    if (!isSuccess || !isFetched) return null;

    return (
        <>
            {(isSuccess || isFetched) &&
                <MovieDetailsCard
                    props={{movieDetails}}
                />
            }
        </>
    );
};

export const MoviePage = memo(MoviePage_);