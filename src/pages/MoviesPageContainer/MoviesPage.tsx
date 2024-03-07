import * as React from "react";
import {FC} from "react";

import {Box} from "@mui/material";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";

import {BackDrop} from "../../components";

import css from "./index.module.scss";
import {MovieCard} from "./SubComponents/MovieCard";
import {MoviesButtonGroup} from "./SubComponents/MoviesButtonGroup";

const MoviesPage: FC = () => {
    const {
        info,
        results,
        prevPage,
        nextPage
    } = useAppMoviesEffect();

    return (
        <>
            {info && <MoviesButtonGroup props={{info, prevPage, nextPage}}/>}
            <Box className={css.Ep__Container}>
                <BackDrop/>
                {!!results.length &&
                    results.map(item =>
                        <MovieCard key={item.id} props={{item}}/>
                    )
                }
            </Box>

        </>
    );
};

export {MoviesPage};