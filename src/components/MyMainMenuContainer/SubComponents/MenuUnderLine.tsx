import React, {FC} from 'react';
import {motion} from "framer-motion";
import {IProps} from "../interfaces";
import css from "../index.module.scss"

const MenuUnderLine: FC<IProps> = ({props}) => {
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

export default MenuUnderLine;