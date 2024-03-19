import React, {FC, useEffect} from "react";

import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";

import {authSelectors} from "../../storage";
import {getCredentials} from "../services";

import {IProps} from "./interfaces";


const AuthRequiredProvider: FC<IProps> = ({children}) => {
    const isAuth = useSelector(authSelectors.getIsAuth);
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

export {AuthRequiredProvider};
