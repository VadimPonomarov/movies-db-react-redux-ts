import {LanguageEnum} from "../../../common";
import {ISearchParams} from "../../../common/hocs/interfaces";

import {IInitialState} from "./interfaces";

export const initialSearchParams: ISearchParams = {
    page: "1",
    language: LanguageEnum.en,
    with_genres: [],
};

export const initialState: IInitialState = {
    themeIsDark: true,
    isDrawer: false,
    isPagination: true,
    backDropImgPath: undefined,
    searchParams: initialSearchParams,
    isCategoryChanged: false,
};

