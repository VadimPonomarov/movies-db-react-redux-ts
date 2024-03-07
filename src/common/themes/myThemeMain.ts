import {createTheme} from "@mui/material";

import {myThemeComponents} from "./myThemeComponents";
import {myThemePalette} from "./myThemePalette";

const myThemeMain = createTheme(
    myThemeComponents,
    myThemePalette,
);

export {myThemeMain};