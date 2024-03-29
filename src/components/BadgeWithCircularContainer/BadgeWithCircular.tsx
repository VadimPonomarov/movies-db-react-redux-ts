import React, {FC, useRef} from "react";

import {Box, CircularProgress, Fab, FabPropsColorOverrides} from "@mui/material";

import {UseAppEffectHook} from "../../common";
import {useAppDispatch} from "../../storage";
import {movieActions} from "../../storage/slices/moviesSlice";

import {defaultProps} from "./constants";
import css from "./index.module.scss";
import {FabColorType, IBadgeGrProps} from "./interfaces";

const BadgeWithCircular: FC<IBadgeGrProps> =
    ({
         props = {...defaultProps},
         movieId
     }) => {
        const {
            btn: {
                bgColor,
                bgHoverColor
            },
            progress: {
                color,
                size
            },
            fab: {fabColor},
            content: {
                initial_,
                success_,
                whileLoading
            },
            rate
        } = {...defaultProps, ...props};

        const dispatch = useAppDispatch();

        const {
            loading,
            success,
            handleButtonClick,
            valOrFunc
        } = UseAppEffectHook();

        const buttonSx: FabPropsColorOverrides = {
            ...(success && {
                bgcolor: bgColor,
                "&:hover": {
                    bgcolor: bgHoverColor,
                },
            }),
        };

        const handleClick: () => void =
            () => {
                handleButtonClick();
                dispatch(
                    movieActions
                        .toggleActiveCardList(movieId)
                );
            };

        const ref = useRef(null);

        return (
            <Box
                className={css.Badge__Box}
            >
                <Box
                    ref={ref}
                    className={css.Badge__Box_Box}
                >
                    <Fab
                        color={fabColor as FabColorType}
                        sx={buttonSx}
                        onClick={handleClick}
                    >
                        <>
                            {!(success || loading) && valOrFunc(initial_)}
                            {loading && valOrFunc(whileLoading)}
                            {success && valOrFunc(success_)}

                            {!loading &&
                                <CircularProgress
                                    className={css.Badge__CP}
                                    sx={{color}}
                                    variant="determinate"
                                    size={(size)}
                                    value={rate}/>}

                            {loading && (
                                <CircularProgress
                                    className={css.Badge__CP}
                                    sx={{color}}
                                    size={size}
                                />
                            )}
                        </>
                    </Fab>
                </Box>
            </Box>
        );
    };

export {BadgeWithCircular};