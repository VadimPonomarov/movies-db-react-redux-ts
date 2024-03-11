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

    return (
        <LayoutGroup id="layoutGroup">
            <Button className={css.LG__Button}>
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
                            {
                                (caption === MovieCategoryEnum.discover && !!with_genres.length)
                                && caption
                            }
                            {
                                caption !== MovieCategoryEnum.discover
                                && t(_.replace(caption, "_", " "))
                            }
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