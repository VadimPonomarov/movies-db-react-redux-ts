import React, {FC, useEffect} from "react";

import {useNavigate} from "react-router-dom";

import {getCredentials} from "../services";

import {IProps} from "./interfaces";


const RegistrationRequiredProvider: FC<IProps> = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isRegistered = getCredentials();
        if (!isRegistered) navigate("/registration");
    }, [navigate]);

    return (
        <>
            {children}
        </>
    );
};

export {RegistrationRequiredProvider};
