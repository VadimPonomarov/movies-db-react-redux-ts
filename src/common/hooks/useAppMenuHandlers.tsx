import React, {Dispatch} from "react";

import {useNavigate} from "react-router-dom";

import {authActions, useAppDispatch} from "../../storage";
import {clearCredentials} from "../services";

interface IProps {
    setAnchorEl: Dispatch<React.SetStateAction<HTMLElement>>;
}

const UseAppMenuHandlers = ({setAnchorEl}: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleRegister = () => {
        setAnchorEl(null);
        navigate("/registration");

    };
    const handleLogin = () => {
        setAnchorEl(null);
        navigate("/login");
    };
    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(authActions.setIsAuth(false));
    };

    const handleClearStore = () => {
        clearCredentials();
        setAnchorEl(null);
        dispatch(authActions.setIsAuth(false));
        navigate("/registration")
    };

    return {handleRegister, handleLogin, handleLogout, handleClearStore};
};

export {UseAppMenuHandlers};