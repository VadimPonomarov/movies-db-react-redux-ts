import {MovieCategoryEnum} from "../../../common";
import {ISearchParams} from "../../../common/hocs/interfaces";

export type ThemeType = "light" | "dark";

export interface IInitialState {
    themeIsDark: boolean,
    isDrawer: boolean,
    isPagination: boolean,
    isLoading?: boolean,
    isError?: boolean | string,
    isSuccess?: boolean,
    backDropImgPath: string,
    searchParams: ISearchParams,
    isCategoryChanged: boolean,
    currentCategory?: MovieCategoryEnum,
}