import {SliderProps, TextFieldProps} from "@mui/material";
import {MotionProps} from "framer-motion";

export const mSpan: MotionProps = {
    initial: {
        height: 0,
        opacity: 0
    },
    whileHover: {
        position: "relative",
        zIndex: "1003",
        top: "5px",
        height: "auto",
        opacity: 1
    },
    transition: {
        duration: .5,
        delay: .3
    }
};

export const pSlider: SliderProps = {
    color: "secondary",
    size: "small",
    marks: true,
    valueLabelDisplay: "auto",
    step: 1
};

export const pTextField: TextFieldProps = {
    variant: "standard",
    size: "small",
};