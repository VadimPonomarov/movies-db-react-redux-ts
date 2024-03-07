import React, {FC, useContext} from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {Badge, Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import {AuthContext} from "common/hocs";

import {getCredentials} from "../../../common/services";
import {MyMainMenu} from "../../MyMainMenuContainer";
import {iconButtonMenuProps} from "../constants";
import css from "../index.module.scss";

import {MyToolbarMenu} from "./MyToolbarMenu";


const MyToolBar: FC = () => {
    const {
        userName,
        isAuth,
        theme,
        setTheme
    } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleTheme = () => {
        theme === "light"
            ? setTheme("dark")
            : setTheme("light");
    };

    return (
        <Toolbar className={css.myToolBar}>
            <IconButton
                {...iconButtonMenuProps}
                onClick={handleTheme}
            >
                <MenuIcon/>
            </IconButton>
            <MyMainMenu/>
            <Badge
                invisible={!userName || !isAuth}
                color="secondary"
                badgeContent={userName || ""}
            >
                <Box>
                    <IconButton
                        {...iconButtonMenuProps}
                        aria-haspopup="true"
                        onClick={handleMenu}
                    >
                        {!!getCredentials()
                            && <AccountCircle/>}
                    </IconButton>
                    <MyToolbarMenu
                        props={{
                            anchorEl,
                            setAnchorEl
                        }}
                    />
                </Box>
            </Badge>
        </Toolbar>
    );
};

export {MyToolBar};