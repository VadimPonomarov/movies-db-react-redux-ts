import {IconButtonProps} from "@mui/material/IconButton";
import {MenuProps} from "@mui/material/Menu";

export const iconButtonMenuProps: Partial<IconButtonProps> = {
    size: "large",
    edge: "start",
    color: "inherit",
    sx: {mr: 2, zIndex: 1001},

}
export const menuProps: Partial<MenuProps> = {
    anchorOrigin: {
        vertical: "top",
        horizontal: "right",
    },
    keepMounted: true,
    transformOrigin: {
        vertical: "top",
        horizontal: "right",
    }
}