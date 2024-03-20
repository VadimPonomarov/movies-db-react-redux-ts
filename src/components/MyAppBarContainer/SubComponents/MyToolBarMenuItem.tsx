import React, {FC, memo} from "react";

import MenuItem from "@mui/material/MenuItem";

import {IMenuItemProps} from "../interfaces";

const MyToolBarMenuItem_: FC<IMenuItemProps> = ({props}) => {
    const {caption, onClick} = props;
    return (
        <MenuItem onClick={onClick}>
            {caption}
        </MenuItem>
    );
};

export const MyToolBarMenuItem = memo(MyToolBarMenuItem_);