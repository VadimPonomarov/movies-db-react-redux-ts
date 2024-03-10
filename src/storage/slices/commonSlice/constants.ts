import {ISearchParams} from "../../../common/hocs/interfaces";

import {IAlertInfo, IInitialState} from "./interfaces";

export enum AlertTypeEnum {
    SUCCESS = "Success",
    WARNING = "Warning",
    ERROR = "Error",
    INFO = "Info"
}

export enum AlertMessageEnum {
    SUCCESS = " 👍 ",
    FAILURE = " 👎 "
}

export const initialAlertInfo: IAlertInfo = {
    type: AlertTypeEnum.INFO,
    message: ""
};
export const initialSearchParams: ISearchParams = {
    with_genres: []
};

export const initialState: IInitialState = {
    themeIsDark: true,
    isDrawer: false,
    isPagination: true,
    alertInfo: initialAlertInfo,
    isPending: false,
    isFetching: false,
    backDropImgPath: undefined,
    searchParams: initialSearchParams
};

