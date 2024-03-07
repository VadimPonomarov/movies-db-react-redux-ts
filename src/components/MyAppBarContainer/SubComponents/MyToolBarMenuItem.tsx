import React, {FC} from 'react';

import MenuItem from "@mui/material/MenuItem";

import {IMenuItemProps} from "../interfaces";

const MyToolBarMenuItem: FC<IMenuItemProps> = ({props}) => {
    const {caption, onClick} = props
    return (
        <MenuItem onClick={onClick}>
            {caption}
        </MenuItem>
    );
};

export {
    MyToolBarMenuItem
};