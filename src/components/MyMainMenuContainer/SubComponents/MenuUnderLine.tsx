import React, {FC, memo} from "react";

import {motion} from "framer-motion";

import css from "../index.module.scss";
import {IProps} from "../interfaces";

const MenuUnderLine_: FC<IProps> = ({props}) => {
    const {caption, isActive} = props

    return (
        <motion.div
            className={css.MUL}
            animate={{
                backgroundColor:
                    isActive === caption ?
                        "rgb(255,0,0)" :
                        "rgba(255,0,0,0)",
                width: "100%",
            }}
        >
        </motion.div>
    )
}

export const MenuUnderLine = memo(MenuUnderLine_);