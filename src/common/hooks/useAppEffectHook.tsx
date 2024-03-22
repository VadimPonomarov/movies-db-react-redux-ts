import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";

import {ContentType} from "../../components/BadgeWithCircularContainer/interfaces";

interface IReturn {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    success: boolean,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    handleButtonClick: () => void,
    valOrFunc: (val: ContentType) => Omit<ContentType, "FuncType">
}

const UseAppEffectHook: () => IReturn =
    () => {

        const [loading, setLoading] = useState<boolean>(false);
        const [success, setSuccess] = useState<boolean>(false);


        const timer = useRef<number>();

        useEffect(() => {
            return () => {
                clearTimeout(timer.current);
            };
        }, []);

        const handleButtonClick: () => void =
            () => {
                if (!loading) {
                    setSuccess(false);
                    setLoading(true);
                    timer.current = window.setTimeout(() => {
                        setSuccess(true);
                        setLoading(false);

                    }, 2000);
                }
            };

        const valOrFunc: (val: ContentType) => Omit<ContentType, "FuncType"> =
            (val) => {
                if (typeof val === "function") {
                    return () => val();
                }
                return val;
            };

        return {loading, setLoading, success, setSuccess, handleButtonClick, valOrFunc};
    };

export {UseAppEffectHook};