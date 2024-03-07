import React, {useState} from "react";

import {ContentType} from "./interfaces";

const UseAppEffectHook = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const timer = React.useRef<number>();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);

            }, 2000);
        }
    };

    const valOrFunc = (val: ContentType): Omit<ContentType, "FuncType"> => {
        if (typeof val === "function") {
            return () => val();
        }
        return val;
    };

    return {loading, setLoading, success, setSuccess, handleButtonClick, valOrFunc};
};

export {UseAppEffectHook};