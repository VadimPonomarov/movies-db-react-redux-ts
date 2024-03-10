import React, {FC} from "react";

import {ThemeProvider as MyThemeProvider, createTheme, Theme} from "@mui/material";
import {myThemeComponents, myThemePalette} from "common/themes";
import {useSelector} from "react-redux";

import {commonSelectors} from "../../storage";

import {IProps} from "./interfaces";

const MyThemeProviderMain: FC<IProps> = ({children}) => {
    const themeIsDark = useSelector(commonSelectors.getThemeIsDark);

    const extraPalette: Theme = createTheme({
        palette: {
            mode: themeIsDark ? "dark" : "light",
        }
    });

    const myThemeMain: Theme = createTheme(
        myThemeComponents,
        {
            ...myThemePalette,
            ...extraPalette
        },
    );

    return (
        <MyThemeProvider
            theme={{...myThemeMain}}
        >
            {children}
        </MyThemeProvider>
    );
};

export {MyThemeProviderMain};