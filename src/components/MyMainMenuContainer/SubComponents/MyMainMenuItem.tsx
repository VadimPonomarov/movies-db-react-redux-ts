import React, {FC, useContext} from "react";

import {Button, Stack, Typography} from "@mui/material";
import _ from "lodash";
import {NavLink} from "react-router-dom";

import {MovieCategoryEnum} from "../../../common";
import {AuthContext} from "../../../common/hocs";
import {IProps} from "../interfaces";
import {LayoutGroup} from "framer-motion";
import css from "../index.module.scss"
import MenuUnderLine from "./MenuUnderLine";

const MyMainMenuItem: FC<IProps> = ({props}) => {
    const {caption, uri, elementProps, isActive, setIsActive} = props;
    const {searchParams: {with_genres}} = useContext(AuthContext);

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
                                && _.replace(caption, "_", " ")
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