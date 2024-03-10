import {PaletteMode} from "@mui/material";

import {IAuthContext, ISearchParams} from "../../../common/hocs/interfaces";

import {AlertMessageEnum, AlertTypeEnum} from "./constants";

export interface IAlertInfo {
    type: AlertTypeEnum | string;
    message: AlertMessageEnum | string;
}

export type ThemeType = "light" | "dark";

export interface IInitialState {
    themeIsDark: boolean,
    isDrawer: boolean,
    isPagination: boolean,
    isPending: boolean;
    isFetching: boolean;
    alertInfo: IAlertInfo;
    backDropImgPath?: string,
    searchParams?: ISearchParams
}