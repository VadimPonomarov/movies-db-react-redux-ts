import {Dispatch, ReactNode, SetStateAction} from "react";

import {LanguageEnum, MovieSortByEnum} from "../types";

export interface IAuthContext {
    theme: "light" | "dark",
    setTheme: Dispatch<SetStateAction<"light" | "dark">>,
}

export interface IProps {
    children?: ReactNode;
}

export interface ISearchParams {
    page?: string,
    language?: LanguageEnum;
    with_genres?: number[];
    with_keywords?: string;
    sort_by?: MovieSortByEnum
}
