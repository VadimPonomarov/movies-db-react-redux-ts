import * as React from "react";
import {FC, useDeferredValue, useRef, useState} from "react";

import {Box, Button} from "@mui/material";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";
import {motion} from "framer-motion";
import {t} from "i18next";
import _ from "lodash";

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
        nextPage,
        setIsMoreActive
    } = useAppMoviesEffect();

    const [isMoreVisible] = useState(true);
    const ref = useRef(null);
    const deferredNextPage = useDeferredValue(nextPage);

    const handleClickMore = () => {
        setIsMoreActive(true);
        nextPage();
        ref.current.scrollIntoView();
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
            {!!isMoreVisible &&
                <motion.div
                    {...divMoreMotion}
                >
                    <Button
                        ref={ref}
                        variant={"text"}
                        className={css.InView__Button_More}
                        onClick={handleClickMore}>
                        {_.capitalize(t("more")) + " ..."}
                    </Button>
                </motion.div>
            }
        </>
    );
};

export {MoviesPage};