import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IAuthContext {
    theme: "light" | "dark",
    setTheme: Dispatch<SetStateAction<"light" | "dark">>,
}

export interface IProps {
    children?: ReactNode;
}

export type LanguageType = "en-US" | "uk-Uk" | "ru-Ru"

export interface ISearchParams {
    language?: LanguageType;
    with_genres?: number[];
}
