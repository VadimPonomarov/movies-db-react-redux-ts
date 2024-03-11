import {Dispatch, ReactNode, SetStateAction} from "react";

import {LanguageEnum} from "../types";

export interface IAuthContext {
    theme: "light" | "dark",
    setTheme: Dispatch<SetStateAction<"light" | "dark">>,
}

export interface IProps {
    children?: ReactNode;
}

export interface ISearchParams {
    language?: LanguageEnum;
    with_genres?: number[];
}
