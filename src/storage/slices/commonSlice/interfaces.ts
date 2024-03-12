import {ISearchParams} from "../../../common/hocs/interfaces";

export type ThemeType = "light" | "dark";

export interface IInitialState {
    themeIsDark: boolean,
    isDrawer: boolean,
    isPagination: boolean,
    isPending: boolean;
    isFetching: boolean;
    backDropImgPath: string,
    searchParams: Partial<ISearchParams>
}