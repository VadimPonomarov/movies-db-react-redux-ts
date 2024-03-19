import {ForwardRefComponent, HTMLMotionProps, MotionProps} from "framer-motion";

export type MyBreakPointType = "xs" | "sm" | "md" | "lg" | "xl"

export type MyBreakPointsType = {
    [key in MyBreakPointType]?: MyBreakPointType
}

export interface IFormAnimateProps extends MotionProps {
    component: ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>,
}