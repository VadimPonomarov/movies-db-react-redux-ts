import React, {createContext, FC, useEffect, useState} from "react";

import {IAuthContext, IProps, ISearchParams} from "./interfaces";
import {useSelector} from "react-redux";
import {commonSelectors} from "../../storage";


const AuthContext = createContext<IAuthContext>(null);

const MyAuthContextProvider: FC<IProps> = ({children}) => {
    const [theme, setTheme] = useState<"light" | "dark">();
    const initContext: IAuthContext = {
        theme,
        setTheme,
    };

    return (
        <AuthContext.Provider value={initContext}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, MyAuthContextProvider};