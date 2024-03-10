import React, {FC} from "react";

import Menu from "@mui/material/Menu";

import {UseAppMenuHandlers} from "../../../common/hooks/useAppMenuHandlers";
import {menuProps} from "../constants";
import {IMenuProps as IProps} from "../interfaces";

import {MyToolBarMenuItem} from "./MyToolBarMenuItem";

const MyToolbarMenu: FC<IProps> = ({props}) => {
    const {anchorEl, setAnchorEl} = props;

    const {handleRegister, handleLogin, handleLogout, handleClearStore} =
        UseAppMenuHandlers({setAnchorEl});

    return (
        <Menu
            anchorEl={anchorEl}
            {...menuProps}
            open={Boolean(anchorEl)}
            onClose={
                () => setAnchorEl(null)
            }
        >
            <MyToolBarMenuItem props={{caption: "Register", onClick: handleRegister}}/>
            <MyToolBarMenuItem props={{caption: "Login", onClick: handleLogin}}/>
            <MyToolBarMenuItem props={{caption: "Logout", onClick: handleLogout}}/>
            <MyToolBarMenuItem props={{caption: "Clear store", onClick: handleClearStore}}/>
        </Menu>
    );
};

export {MyToolbarMenu};