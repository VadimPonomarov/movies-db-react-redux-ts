import {LanguageEnum} from "../../../common";
import {ISearchParams} from "../../../common/hocs/interfaces";

import {IInitialState} from "./interfaces";

export const initialSearchParams: ISearchParams = {
    with_genres: [],
    language: LanguageEnum.en
};

export const initialState: IInitialState = {
    themeIsDark: true,
    isDrawer: false,
    isPagination: true,
    isPending: false,
    isFetching: false,
    backDropImgPath: undefined,
    searchParams: initialSearchParams
};

