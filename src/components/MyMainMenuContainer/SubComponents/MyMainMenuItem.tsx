import React, {FC} from "react";

import {Button, Stack, Typography} from "@mui/material";
import {LayoutGroup} from "framer-motion";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {MovieCategoryEnum} from "../../../common";
import {commonSelectors} from "../../../storage";
import css from "../index.module.scss";
import {IProps} from "../interfaces";

import MenuUnderLine from "./MenuUnderLine";


const MyMainMenuItem: FC<IProps> = ({props}) => {
    const {caption, uri, elementProps, isActive, setIsActive} = props;
    const {with_genres} = useSelector(commonSelectors.getSearchParams);
    const {t} = useTranslation();

    const handleDisplay = () => {
        if (caption === "discover" && !!with_genres.length) return "block";
        if (caption !== "discover") return "block";
        return "none";
    };

    return (
        <LayoutGroup
            id="layoutGroup"
        >
            <Button
                className={css.LG__Button}
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
                        onClick={
                            () => setIsActive(caption)
                        }
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

export {MyMainMenuItem};