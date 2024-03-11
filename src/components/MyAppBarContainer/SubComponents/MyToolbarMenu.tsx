import React, {FC} from "react";

import Menu from "@mui/material/Menu";
import _ from "lodash";
import {useTranslation} from "react-i18next";

import {UseAppMenuHandlers} from "../../../common/hooks/useAppMenuHandlers";
import {menuProps} from "../constants";
import {IMenuProps as IProps} from "../interfaces";

import {MyToolBarMenuItem} from "./MyToolBarMenuItem";

const MyToolbarMenu: FC<IProps> = ({props}) => {
    const {anchorEl, setAnchorEl} = props;

    const {handleRegister, handleLogin, handleLogout, handleClearStore} =
        UseAppMenuHandlers({setAnchorEl});

    const {t} = useTranslation();

    return (
        <Menu
            anchorEl={anchorEl}
            {...menuProps}
            open={Boolean(anchorEl)}
            onClose={
                () => setAnchorEl(null)
            }
        >
            <MyToolBarMenuItem props={{caption: _.capitalize(t("register")), onClick: handleRegister}}/>
            <MyToolBarMenuItem props={{caption: _.capitalize(t("login")), onClick: handleLogin}}/>
            <MyToolBarMenuItem props={{caption: _.capitalize(t("logout")), onClick: handleLogout}}/>
            <MyToolBarMenuItem props={{caption: _.capitalize(t("clear store")), onClick: handleClearStore}}/>
        </Menu>
    );
};

export {MyToolbarMenu};