import React, {FC} from "react";

import {Button, Stack, Typography} from "@mui/material";
import {LayoutGroup} from "framer-motion";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {MovieCategoryEnum} from "../../../common";
import {commonActions, commonSelectors, useAppDispatch} from "../../../storage";
import css from "../index.module.scss";
import {IProps} from "../interfaces";

import {MenuUnderLine} from "./MenuUnderLine";


const MainMenuItem: FC<IProps> = ({props}) => {
    const {caption, uri, elementProps, isActive} = props;
    const {with_genres} = useSelector(commonSelectors.getSearchParams);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const handleDisplay: () => string =
        () => {
            if (caption === "discover" && !!with_genres.length) return "flex";
            if (caption !== "discover") return "flex";
            return "none";
        };

    const handleOnClick: () => void =
        () => {
            dispatch(commonActions.setIsCategoryChanged(true));
            dispatch(commonActions.setCurrentCategory(Object(MovieCategoryEnum)[caption]));
            setTimeout(() => {
                dispatch(commonActions.setIsCategoryChanged(false));
            }, 300);
        };

    return (
        <LayoutGroup
            id="layoutGroup"
        >
            <Button
                className={[
                    "Button__menu_main",
                    css.LG__Button]
                    .join(" ")
                }
                sx={{
                    display: handleDisplay()
                }}
            >
                <Stack
                    className={css.LG__Stack}
                    spacing={0}
                >
                    <NavLink
                        to={uri}
                        {...elementProps}
                        onClick={handleOnClick}
                    >
                        <Typography variant={"subtitle1"}>
                            {t(_.replace(caption, "_", " "))}
                        </Typography>
                        <MenuUnderLine
                            props={{caption, isActive}}
                        />
                    </NavLink>
                </Stack>
            </Button>
        </LayoutGroup>
    );
};

export {MainMenuItem};