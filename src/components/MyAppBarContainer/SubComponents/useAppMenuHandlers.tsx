import React, {Dispatch, useContext} from "react";

import {useNavigate} from "react-router-dom";

import {AuthContext} from "../../../common/hocs";
import {clearCredentials} from "../../../common/services";

interface IProps {
    setAnchorEl: Dispatch<React.SetStateAction<HTMLElement>>;
}

const UseAppMenuHandlers = ({setAnchorEl}: IProps) => {
    const navigate = useNavigate();
    const {setIsAuth} = useContext(AuthContext);

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
        setIsAuth(false);
    };

    const handleClearStore = () => {
        clearCredentials();
        setAnchorEl(null);
        setIsAuth(false);
        navigate("/registration")
    };

    return {handleRegister, handleLogin, handleLogout, handleClearStore};
};

export {UseAppMenuHandlers};