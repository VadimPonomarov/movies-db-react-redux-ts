import {blue, yellow} from "@mui/material/colors";

import {IBadgeGr} from "./interfaces";

export const defaultProps: Partial<IBadgeGr> = {
    btn: {
        bgColor: yellow["500"],
        bgHoverColor: blue["500"]
    },
    progress: {
        color: "default",
        size: 55,
    },
    fab: {
        fabColor: "default"
    },
    content: {
        initial_: "",
        whileLoading: "",
        success_: "",
    },
    rate: undefined
};