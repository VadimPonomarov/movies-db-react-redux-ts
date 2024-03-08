import React, {Dispatch, useContext} from "react";

import {useNavigate} from "react-router-dom";

import {AuthContext} from "../../../common/hocs";
import {clearCredentials} from "../../../common/services";
import {useSelector} from "react-redux";
import {authActions, authSelectors, useAppDispatch} from "../../../storage";

interface IProps {
    setAnchorEl: Dispatch<React.SetStateAction<HTMLElement>>;
}

const UseAppMenuHandlers = ({setAnchorEl}: IProps) => {
    const navigate = useNavigate();
    const setIsAuth = useSelector(authSelectors.getIsAuth);
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