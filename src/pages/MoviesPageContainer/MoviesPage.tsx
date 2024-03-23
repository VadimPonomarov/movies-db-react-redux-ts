import * as React from "react";
import {FC, useEffect, useState} from "react";

import {Box, Button} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import {useAppMoviesEffect} from "common/hooks/useAppMoviesEffect";
import {motion} from "framer-motion";
import {t} from "i18next";
import _ from "lodash";
import {useSelector} from "react-redux";

import {BackDrop} from "../../components";
import {useAppDispatch} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";

import {divMoreMotion} from "./constants";
import css from "./index.module.scss";
import {MovieCard} from "./SubComponents/MovieCard";
import {MoviesButtonGroup} from "./SubComponents/MoviesButtonGroup";


const MoviesPage: FC = () => {
    const {
        info,
        getFilteredResults,
        prevPage,
        nextPage,
        handleClickMore,
        getChoicesFromCache
    } = useAppMoviesEffect();

    const [isMoreVisible] = useState<boolean>(true);
    const movieChoiceLIst = useSelector(movieSelectors.getActiveCardList);
    const showChoices = useSelector(movieSelectors.getShowChoices);
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [getFilteredResults]);

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

            <FormGroup
                className={css.FG}
            >
                {!showChoices &&
                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    !!movieChoiceLIst.length
                                }
                                onChange={
                                    () =>
                                        dispatch(
                                            movieActions.cleanActiveCardList()
                                        )
                                }
                            />
                        }
                        label={
                            !!movieChoiceLIst.length ?
                                t("clean") : ""
                        }
                    />
                }
            </FormGroup>

            <Box
                className={css.Ep__Container}
            >
                <BackDrop/>
                {(!showChoices && !!getFilteredResults.length) &&
                    getFilteredResults
                        .map(item =>
                            <MovieCard
                                key={item.id}
                                props={{
                                    item
                                }}
                            />
                        )
                }
                {!!showChoices &&
                    getChoicesFromCache()
                        .map(item =>
                            <MovieCard
                                key={item.id}
                                props={{
                                    item
                                }}
                            />
                        )}
            </Box>
            {!!isMoreVisible &&
                <motion.div
                    {...divMoreMotion}
                >
                    <Button
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