import React, {FC, ReactNode, useEffect} from "react";

import {motion} from "framer-motion";
import {useSelector} from "react-redux";

import {authActions, authSelectors, useAppDispatch} from "../../storage";

interface IProps {
    children: ReactNode;
}

const MyInitMotionProvider: FC<IProps> = ({children}) => {
    const isInit = useSelector(authSelectors.getIsInit);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            if (!!isInit) dispatch(authActions.setIsInit(false));
        };
    }, [isInit, dispatch]);

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

export {MyInitMotionProvider};