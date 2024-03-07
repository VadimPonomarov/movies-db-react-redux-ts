import {Dispatch, ReactNode, SetStateAction} from "react";

export interface IAuthContext {
    userName?: string,
    setUserName: Dispatch<SetStateAction<string>>
    isAuth: boolean,
    isInit: boolean,
    setIsInit: Dispatch<SetStateAction<boolean>>
    isDrawer: boolean,
    setIsDrawer: Dispatch<SetStateAction<boolean>>
    setIsAuth: Dispatch<SetStateAction<boolean>>
    theme: "light" | "dark",
    setTheme: Dispatch<SetStateAction<"light" | "dark">>,
    backDropImgPath?: string,
    setBackDropImgPath: Dispatch<SetStateAction<string>>
    searchParams: ISearchParams
    setSearchParams: Dispatch<SetStateAction<ISearchParams>>
}

export interface IProps {
    children?: ReactNode;
}

export type LanguageType = "en-US" | "uk-Uk" | "ru-Ru"

export interface ISearchParams {
    language?: LanguageType;
    with_genres?: number[];
}
