import React, {FC} from "react";

import Menu from "@mui/material/Menu";

import {menuProps} from "../constants";
import {IMenuProps as IProps} from "../interfaces";

import {MyToolBarMenuItem} from "./MyToolBarMenuItem";
import {UseAppMenuHandlers} from "./useAppMenuHandlers";

const MyToolbarMenu: FC<IProps> = ({props}) => {
    const {anchorEl, setAnchorEl} = props;

    const {handleRegister, handleLogin, handleLogout, handleClearStore} =
        UseAppMenuHandlers({setAnchorEl});

    return (
        <Menu
            anchorEl={anchorEl}
            {...menuProps}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            <MyToolBarMenuItem props={{caption: "Register", onClick: handleRegister}}/>
            <MyToolBarMenuItem props={{caption: "Login", onClick: handleLogin}}/>
            <MyToolBarMenuItem props={{caption: "Logout", onClick: handleLogout}}/>
            <MyToolBarMenuItem props={{caption: "Clear store", onClick: handleClearStore}}/>
        </Menu>
    );
};

export {MyToolbarMenu};