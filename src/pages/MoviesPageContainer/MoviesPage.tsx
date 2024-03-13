import * as React from "react";
import {FC, useDeferredValue, useRef, useState} from "react";

import {Box, Button, Container} from "@mui/material";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";
import {motion} from "framer-motion";
import {t} from "i18next";
import _ from "lodash";
import {InView} from "react-intersection-observer";

import {BackDrop} from "../../components";

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

    const [isMoreVisible] = useState(true);
    const ref = useRef(null);
    const deferredNextPage = useDeferredValue(nextPage);

    const handleMore = () => {
        if (Math.abs(ref.current.getBoundingClientRect().y) > 200) {
            deferredNextPage();
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