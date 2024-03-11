import React from "react";

import {MyQueryClientProvider} from "common/hocs";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

import {MyThemeProviderMain} from "./common/hocs/MyThemeProviderMain";
import {MyTranslations} from "./common/hocs/MyTranslations";
import {Router} from "./router";
import {persistor, store} from "./storage";
import "./index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistor}
        >
            <MyQueryClientProvider>
                <MyThemeProviderMain>
                    <MyTranslations>
                        <RouterProvider
                            router={Router}
                        />
                    </MyTranslations>
                </MyThemeProviderMain>
            </MyQueryClientProvider>
        </PersistGate>
    </Provider>
);
