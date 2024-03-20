import React, {FC} from "react";

import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {useSelector} from "react-redux";

import {commonSelectors} from "../../storage";
import {I18InitProps} from "../constants/i18InitProps";

import {IProps} from "./interfaces";


const TranslationsProvider: FC<IProps> = ({children}) => {
    const {language: lng} = useSelector(commonSelectors.getSearchParams);

    i18n
        .use(initReactI18next)
        .init({
            ...I18InitProps,
            lng,
        })


    return (
        <>
            {children}
        </>
    );
};

export {TranslationsProvider};