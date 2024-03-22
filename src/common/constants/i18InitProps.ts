import {InitOptions} from "i18next";

export const I18InitProps: InitOptions = {
    resources: {
        ru: {
            translation: {
                "upcoming": "ожидаемые",
                "popular": "популярные",
                "now playing": "смотрят",
                "top rated": "лучшие",
                "discover": "поиск",
                "register": "зарегистрироваться",
                "login": "войти",
                "logout": "выйти",
                "clear store": "очистить",
                "genres": "жанры",
                "prev": "назад",
                "next": "след",
                "more": "еще",
                "clean": "очистить",
                "success": "успех",
                "choices": "показать отобранные",
            }
        },
        uk: {
            translation: {
                "upcoming": "незабаром",
                "popular": "популярні",
                "now playing": "дивляться",
                "top rated": "найкращі",
                "discover": "пошук",
                "register": "реєстрація",
                "login": "увійти",
                "logout": "вийти",
                "clear store": "очистити",
                "genres": "жанри",
                "prev": "назад",
                "next": "вперед",
                "more": "далі",
                "clean": "очистити",
                "success": "успіх",
                "choices": "показати відібрані",
            }
        }
    },
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
};