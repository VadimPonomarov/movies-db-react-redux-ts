import React, {FC, ReactNode, useContext, useEffect} from "react";

import {motion} from "framer-motion";

import {AuthContext} from "./MyAuthContextProvider";

interface IProps {
    children: ReactNode;
}

const MyInitMotion: FC<IProps> = ({children}) => {
    const {isInit, setIsInit} = useContext(AuthContext);

    useEffect(() => {
        return () => {
            if (isInit) setIsInit(false);
        };
    }, [isInit, setIsInit]);

    return (
        <>
            {
                !isInit
                    ?
                    <motion.span
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            delay: Math.random(),
                            ease: "linear"
                        }}

                    >
                        {children}
                    </motion.span>
                    :
                    <motion.span
                        initial={{height: 0, opacity: 0}}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            rotateX: 360,
                            rotateZ: 360
                        }}
                        transition={{
                            duration: 5,
                            delay: Math.random() * 2
                        }}
                    >
                        {children}
                    </motion.span>
            }
        </>
    );
};

export {MyInitMotion};