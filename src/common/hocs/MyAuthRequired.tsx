import React, {FC, useContext, useEffect} from "react";

import {Navigate, useNavigate} from "react-router-dom";

import {getCredentials} from "../services";

import {IProps} from "./interfaces";
import {AuthContext} from "./MyAuthContextProvider";
import {useSelector} from "react-redux";
import {authSelectors} from "../../storage";


const MyAuthRequired: FC<IProps> = ({children}) => {
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

export {MyAuthRequired};
