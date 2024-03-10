import * as React from "react";
import {FC, useDeferredValue, useRef, useState} from "react";

import {Box} from "@mui/material";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";

import {BackDrop} from "../../components";

import css from "./index.module.scss";
import {MovieCard} from "./SubComponents/MovieCard";
import {MoviesButtonGroup} from "./SubComponents/MoviesButtonGroup";
import {InView} from "react-intersection-observer";

const MoviesPage: FC = () => {
    const {
        info,
        results,
        prevPage,
        nextPage
    } = useAppMoviesEffect();

    const [isInit, setIsInit] = useState<boolean>(true);

    const deferredNextPage = useDeferredValue(nextPage);

    const ref = useRef(null);

    const handleInView = () => {
        if (isInit) {
            setIsInit(false)
        };
        ref.current.scrollIntoView();
        deferredNextPage();
    };

    return (
        <>
            {info &&
                <MoviesButtonGroup
                    props={{
                        info,
                        prevPage,
                        nextPage
                    }}
                />}

            <Box
                ref={ref}
                className={css.Ep__Container}
            >
                <BackDrop/>
                {!!results.length &&
                    results.map(item =>
                        <MovieCard
                            key={item.id}
                            props={{
                                item
                            }}
                        />
                    )
                }
            </Box>
            <InView
                as="div"
                onChange={
                    handleInView
                }
            />
        </>
    );
};

export {MoviesPage};