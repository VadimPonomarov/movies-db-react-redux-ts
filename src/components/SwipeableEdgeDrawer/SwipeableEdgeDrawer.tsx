import * as React from "react";
import {FC, useState} from "react";

import {Global} from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import {Box, Button, Checkbox, CssBaseline, SwipeableDrawer, TextField, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {useAppBg, useAppMoviesEffect} from "../../common";
import {authSelectors, commonActions, useAppDispatch} from "../../storage";
import {movieActions, movieSelectors} from "../../storage/slices/moviesSlice";
import {BadgeGroup} from "../BadgeGroup";
import {MainMenu} from "../MainMenuContainer";
import {SelectSortBy} from "../SelectSortBy";

import {drawerBleeding, Puller, Root, toggleDrawer} from "./constants";
import css from "./index.module.scss";
import {IProps} from "./interfaces";


const SwipeableEdgeDrawer: FC<IProps> = () => {
    const [open, setOpen] =
        useState<boolean>(false);
    const isAuth =
        useSelector(authSelectors.getIsAuth);
    const movies =
        useSelector(movieSelectors.getMovies);
    const genres =
        useSelector(movieSelectors.getGenres);
    const showChoices =
        useSelector(movieSelectors.getShowChoices);
    const isChoices =
        useSelector(movieSelectors.getActiveCardList);
    const dispatch =
        useAppDispatch();
    const {movieId} =
        useParams<string>();
    const navigate =
        useNavigate();
    const {t} =
        useTranslation();
    const {handleChange, checked} =
        useAppBg();
    const {getFilteredResults} = useAppMoviesEffect();

    const handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void =
        (e) => {
            console.log(e.target.value);
        };


    return (
        <Root>
            <CssBaseline/>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            <Box>
                {isAuth &&
                    <Button
                        className={css.Sed__Box_Button}
                        variant={"text"}
                    >
                        {movieId ?
                            <Typography
                                className={css.Pointer}
                                variant={"h5"}
                                onClick={() => navigate(-1)}
                            >
                                👈
                            </Typography> :
                            <Typography
                                className={css.Typography__Genres}
                                variant={"caption"}
                                onClick={toggleDrawer(undefined, setOpen)}
                            >
                                {t("genres")}
                            </Typography>
                        }
                    </Button>
                }
            </Box>

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false, setOpen)}
                onOpen={toggleDrawer(true, setOpen)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true
                }}

            >
                <TextField
                    className={css.SearchField}
                    label={<SearchIcon/>}
                    variant="standard"
                    onChange={
                        (e) =>
                            handleInputChange(e)
                    }
                />
                <FormGroup
                    className={css.FG}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={!!genres.length}
                                onChange={
                                    () =>
                                        dispatch(commonActions
                                            .setSearchParams({
                                                with_genres: []
                                            })
                                        )
                                }
                            />
                        }
                        label={t("clean")}
                    />
                    <span>
                        <SelectSortBy/>
                    </span>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={!!showChoices}
                                disabled={!isChoices.length}
                                onChange={
                                    () =>
                                        dispatch(
                                            movieActions
                                                .setShowChoices(
                                                    !showChoices
                                                )
                                        )
                                }
                            />
                        }
                        label={
                            !showChoices ?
                                t("choices") :
                                t("disable")}
                    />
                </FormGroup>
                <Puller/>
                <Typography
                    sx={{
                        p: 2,
                        color: "text.secondary"
                    }}
                >
                    {!_.upperCase(t("genres"))}
                </Typography>
                <Box
                    className={css.Sed__BG_Container}
                >
                    <Checkbox
                        sx={{position: "absolute", top: "20px"}}
                        checked={!checked}
                        onChange={handleChange}
                    />

                    <BadgeGroup/>
                </Box>
                <Box
                    className={css.Menu}
                >
                    <MainMenu/>
                </Box>
            </SwipeableDrawer>

        </Root>
    );
};

export {SwipeableEdgeDrawer};