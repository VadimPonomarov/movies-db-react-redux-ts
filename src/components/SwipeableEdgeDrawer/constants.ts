import * as React from "react";

import {styled} from "@mui/material";
import {grey} from "@mui/material/colors";

const drawerBleeding = 56;

const pullerProps = {
    width: 30,
    height: 6,

    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
};

const rootProps = {
    height: "100%"
};

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

const toggleDrawer = (newOpen: boolean | undefined = undefined, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    if (newOpen) {
        return setOpen(newOpen);
    }
    setOpen((prevState) => !prevState);
};

export {drawerBleeding, pullerProps, rootProps, Root, StyledBox, Puller, toggleDrawer};