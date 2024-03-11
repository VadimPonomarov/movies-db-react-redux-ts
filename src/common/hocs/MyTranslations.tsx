import React, {FC} from "react";

import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {useSelector} from "react-redux";

import {commonSelectors} from "../../storage";

import {IProps} from "./interfaces";


const MyTranslations: FC<IProps> = ({children}) => {
    const {language} = useSelector(commonSelectors.getSearchParams);

    i18n
        .use(initReactI18next)
        .init({
            resources: {
                ru: {
                    translation: {
                        "upcoming": "ожидаемые",
                        "popular": "популярные",
                        "now playing": "смотрят",
                        "top rated": "лучшие",
                        "register": "зарегистрироваться",
                        "login": "войти",
                        "logout": "выйти",
                        "clear store": "очистить",
                        "genres": "жанры"
                    }
                },
                uk: {
                    translation: {
                        "upcoming": "незабаром",
                        "popular": "популярні",
                        "now playing": "дивляться",
                        "top rated": "найкращі",
                        "register": "реєстрація",
                        "login": "зайти",
                        "logout": "вийти",
                        "clear store": "очистити",
                        "genres": "жанри"
                    }
                }
            },
            lng: language,
            fallbackLng: "en",

            interpolation: {
                escapeValue: false
            }
        });

    return (
        <>
            {children}
        </>
    );
};

export {MyTranslations};