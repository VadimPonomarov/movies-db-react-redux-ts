import * as React from "react";
import {FC, useCallback, useDeferredValue, useRef, useState} from "react";

import {Box, Button} from "@mui/material";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";
import {motion} from "framer-motion";
import {InView} from "react-intersection-observer";
import {useSelector} from "react-redux";

import {BackDrop} from "../../components";
import {authSelectors, commonActions, commonSelectors, useAppDispatch} from "../../storage";

import {divMoreMotion} from "./constants";
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

    const [isMoreVisible, setIsMoreVisible] = useState(true);
    const dispatch = useAppDispatch();
    const ref = useRef(null);
    const isInit = useSelector(authSelectors.getIsInit);
    const isPagination = useSelector(commonSelectors.getIsPagination);
    const deferredNextPage = useDeferredValue(nextPage);

    const handleMore = () => {
        setIsMoreVisible(false);
        dispatch(commonActions.setIsPagination(false));
        deferredNextPage();
        setTimeout(() => {
            dispatch(commonActions.setIsPagination(true));
        }, 4000);
    };

    const handleInView = useCallback(() => {
        if (!isInit && isPagination) {
            ref.current.scrollIntoView();
            return deferredNextPage();
        }
        dispatch(commonActions.setIsPagination(true));

    }, [dispatch, isInit, deferredNextPage, isPagination]);

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
            >
                {!!isMoreVisible &&
                    <motion.div
                        {...divMoreMotion}
                    >
                        <Button
                            className={css.InView__Button_More}
                            onClick={handleMore}>
                            More ...
                        </Button>
                    </motion.div>
                }
            </InView>
        </>
    );
};

export {MoviesPage};