import React, {FC, useContext, useEffect} from "react";

import {Navigate, useNavigate} from "react-router-dom";

import {getCredentials} from "../services";

import {IProps} from "./interfaces";
import {AuthContext} from "./MyAuthContextProvider";


const MyAuthRequired: FC<IProps> = ({children}) => {
    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const isRegistered = getCredentials();
        if (!isRegistered) navigate("/registration");
    }, [navigate, isAuth]);

    if (!isAuth) return <Navigate to="/login"/>;

    return (
        <>
            {children}
        </>
    );
};

export {MyAuthRequired};
