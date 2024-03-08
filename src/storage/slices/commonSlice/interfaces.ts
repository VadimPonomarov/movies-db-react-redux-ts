import {AlertMessageEnum, AlertTypeEnum} from "./constants";
import {IAuthContext, ISearchParams} from "../../../common/hocs/interfaces";
import {PaletteMode} from "@mui/material";

export interface IAlertInfo {
    type: AlertTypeEnum | string;
    message: AlertMessageEnum | string;
}

export type ThemeType = "light" | "dark";

export interface IInitialState {
    themeIsDark: boolean,
    isDrawer: boolean,
    isPending: boolean;
    isFetching: boolean;
    alertInfo: IAlertInfo;
    backDropImgPath?: string,
    searchParams?: ISearchParams
}