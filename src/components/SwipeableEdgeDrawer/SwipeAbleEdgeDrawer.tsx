import * as React from "react";
import {FC, useState} from "react";

import {Global} from "@emotion/react";
import {Box, Button, Container, CssBaseline, SwipeableDrawer, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {authSelectors, commonActions, useAppDispatch} from "../../storage";
import {movieSelectors} from "../../storage/slices/moviesSlice";
import {BadgeGroup} from "../BadgeGroup";

import {drawerBleeding, Puller, Root, StyledBox, toggleDrawer} from "./constants";
import css from "./index.module.scss";
import {IProps} from "./interfaces";


const SwipeAbleEdgeDrawer: FC<IProps> = () => {
    const [open, setOpen] =
        useState<boolean>(false);
    const isAuth = useSelector(authSelectors.getIsAuth);
    const genres = useSelector(movieSelectors.getGenres);
    const dispatch = useAppDispatch();
    const {movieId} = useParams<string>();
    const navigate = useNavigate();
    const {t} = useTranslation();


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
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={!!genres.length}
                                onChange={
                                    () => dispatch(commonActions
                                        .setSearchParams({with_genres: []})
                                    )
                                }
                            />
                        }
                        label={t("clear")}
                    />
                </FormGroup>
                <StyledBox
                    className={css.Sed__StyledBox}
                >
                    <Puller/>
                    <Typography
                        sx={{
                            p: 2,
                            color: "text.secondary"
                        }}
                    >
                        {!_.upperCase(t("genres"))}
                    </Typography>
                </StyledBox>
                <Container
                    className={css.Sed__BG_Container}
                >
                    <BadgeGroup/>
                </Container>
            </SwipeableDrawer>
        </Root>
    );
};

export {SwipeAbleEdgeDrawer};