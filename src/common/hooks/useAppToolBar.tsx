import {useEffect, useState} from "react";

import {getCredentials} from "../services";

interface IReturn {
    registered: boolean;
}

const UseAppToolBar: () => IReturn =
    () => {
        const [registered, setIsRegistered] =
            useState<boolean>(false);

        useEffect(() => {
            setIsRegistered(!!getCredentials());
        }, [registered]);

        return {registered};
    };

export {UseAppToolBar};