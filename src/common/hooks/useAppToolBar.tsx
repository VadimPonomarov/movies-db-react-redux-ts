import  {useEffect, useState} from "react";

import {getCredentials} from "../services";

const UseAppToolBar = () => {
    const [registered, setIsRegistered] = useState<boolean>();

    useEffect(() => {
       setIsRegistered(!!getCredentials())
    }, [registered]);

    return {registered};
};

export {UseAppToolBar};