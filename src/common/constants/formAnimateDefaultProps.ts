import {motion} from "framer-motion";

import {IFormAnimateProps} from "../types";

export const formAnimateDefaultProps: IFormAnimateProps = {
    component: motion.div,
    animate: {
        y: [-300, 0],
        opacity: [0, 1]
    },
    transition: {
        y: {
            duration: 1
        },
        opacity: {
            duration: 3
        }
    },
};