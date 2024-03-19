import React, {FC} from "react";

import {createTheme, Theme, ThemeProvider as MyThemeProvider} from "@mui/material";
import {myThemeComponents, myThemePalette} from "common/themes";
import {useSelector} from "react-redux";

import {commonSelectors} from "../../storage";

import {IProps} from "./interfaces";

const MThemeProvider: FC<IProps> = ({children}) => {
    const themeIsDark = useSelector(commonSelectors.getThemeIsDark);

    const extraPalette: Theme = createTheme({
        palette: {
            mode: themeIsDark ? "dark" : "light",
        }
    });

    const theme: Theme = createTheme(
        myThemeComponents,
        {
            ...myThemePalette,
            ...extraPalette
        },
    );

    return (
        <MyThemeProvider theme={theme}>
            {children}
        </MyThemeProvider>
    );
};

export {MThemeProvider};