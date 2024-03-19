import React, {Dispatch} from "react";

import {useNavigate} from "react-router-dom";

import {authActions, useAppDispatch} from "../../storage";
import {clearCredentials} from "../services";

interface IProps {
    setAnchorEl: Dispatch<React.SetStateAction<HTMLElement>>;
}

interface IReturn {
    handleRegister: () => void,
    handleLogin: () => void,
    handleLogout: () => void,
    handleClearStore: () => void
}

const UseAppMenuHandlers: (props: IProps) => IReturn =
    ({setAnchorEl}) => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch();

        const handleRegister: () => void =
            () => {
                setAnchorEl(null);
                navigate("/registration");

            };
        const handleLogin: () => void =
            () => {
                setAnchorEl(null);
                navigate("/login");
            };
        const handleLogout: () => void =
            () => {
                setAnchorEl(null);
                dispatch(authActions.setIsAuth(false));
            };

        const handleClearStore: () => void =
            () => {
                clearCredentials();
                setAnchorEl(null);
                dispatch(authActions.setIsAuth(false));
                navigate("/registration");
            };

        return {handleRegister, handleLogin, handleLogout, handleClearStore};
    };

export {UseAppMenuHandlers};