import {useCallback, useEffect, useState} from "react";

import {myFormBreakPoints} from "../constants";
import {MyBreakPointType} from "../types";

import {IProps} from "./interfaces";

const useContainerWidthResponsive = (props: IProps) => {
    const [value, setValue] = useState<MyBreakPointType>();
    const {breakPoints} = props;
    const [breakpoints] = useState({...myFormBreakPoints, ...breakPoints});

    const handleMaxWidth = useCallback(() => {
        const width = window.innerWidth;

        Object.keys(breakpoints).forEach(item => {
                if (width < 360) {
                    setValue(breakpoints.xs);
                } else if (width < 600) {
                    setValue(breakpoints.sm);
                } else if (width < 960) {
                    setValue(breakpoints.md);
                } else if (width < 1280) {
                    setValue(breakpoints.lg);
                } else {
                    setValue(breakpoints.xl);
                }
            }
        );
    }, [breakpoints]);

    useEffect(() => {
        handleMaxWidth();
        window.addEventListener("resize", handleMaxWidth);
        return () => {
            window.removeEventListener("resize", handleMaxWidth);
        };
    }, [handleMaxWidth]);


    return [value];
};
export {useContainerWidthResponsive};