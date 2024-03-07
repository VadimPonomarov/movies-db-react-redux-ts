import {ReactElement} from "react";

import {SvgIconComponent} from "@mui/icons-material";
import {blue, green, grey, orange, red, yellow} from "@mui/material/colors";

export type MuiColorType =
    string
    | typeof red
    | typeof blue
    | typeof green
    | typeof yellow
    | typeof grey
    | typeof orange


export type FabColorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "default"
export type FuncType = () => string | number | ReactElement<SvgIconComponent>
export type ContentType = string | number | ReactElement<SvgIconComponent> | FuncType

export interface IBadgeGr {
    btn?: {
        bgColor?: MuiColorType,
        bgHoverColor?: MuiColorType
    },
    progress?: {
        color?: MuiColorType,
        size?: number,
    },
    fab?: {
        fabColor?: FabColorType
    },
    content?: {
        initial_?: ContentType,
        success_?: ContentType,
        whileLoading?: ContentType,
    },
    rate?: number
}

export interface IBadgeGrProps {
    props?: Partial<IBadgeGr>;
}