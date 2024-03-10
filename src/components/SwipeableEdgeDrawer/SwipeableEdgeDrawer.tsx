import * as React from "react";
import {FC, useState} from "react";

import {Global} from "@emotion/react";
import {Box, Button, Container, CssBaseline, styled, SwipeableDrawer, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {authSelectors} from "../../storage";
import {BadgeGroup} from "../BadgeGroup";

import {drawerBleeding, pullerProps, rootProps} from "./constants";
import css from "./index.module.scss";
import {IProps} from "./interfaces";

const Root =
    styled("div")(({theme}) => ({
        rootProps,
        backgroundColor:
            theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
    }));

const StyledBox =
    styled("div")(({theme}) => ({
        backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
    }));

const Puller =
    styled("div")(({theme}) => ({
        pullerProps,
        backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    }));

const SwipeableEdgeDrawer: FC<IProps> = (props) => {
    const isAuth = useSelector(authSelectors.getIsAuth);
    const [open, setOpen] = useState(false);
    const {movieId} = useParams();
    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
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
                                variant={"caption"}
                                onClick={toggleDrawer(true)}
                            >
                                Genres
                            </Typography>
                        }
                    </Button>
                }
            </Box>

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <StyledBox
                    className={css.Sed__StyledBox}
                    sx={{
                        top: -drawerBleeding
                    }}
                >
                    <Puller/>
                    <Typography sx={{p: 2, color: "text.secondary"}}>
                        "Genres"
                    </Typography>
                </StyledBox>
                <Container className={css.Sed__BG_Container}>
                    <BadgeGroup/>
                </Container>
            </SwipeableDrawer>
        </Root>
    );
};

export {SwipeableEdgeDrawer};