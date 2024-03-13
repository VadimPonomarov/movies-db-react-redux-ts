import * as React from "react";
import {FC, useCallback, useDeferredValue, useRef, useState} from "react";

import {Box, Button, Container} from "@mui/material";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";
import {motion} from "framer-motion";
import {t} from "i18next";
import _ from "lodash";
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
        if (Math.abs(ref.current.getBoundingClientRect().y) > 200) {
            nextPage();
            window.scrollTo(0, 0);
        }
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
                onChange={handleMore}
                threshold={.9}
            >
                {!!isMoreVisible &&
                    <motion.div
                        {...divMoreMotion}
                    >
                        <Container sx={{height: "70vh"}}>
                            <Button
                                ref={ref}
                                className={css.InView__Button_More}
                                onClick={handleMore}>
                                {_.capitalize(t("more"))+" ..."}
                            </Button>
                        </Container>
                    </motion.div>
                }
            </InView>
        </>
    );
};

export {MoviesPage};