import React from "react";

import {MQueryClientProvider} from "common/hocs";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

import {MThemeProvider, TranslationsProvider} from "./common/hocs";
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
            <MQueryClientProvider>
                <MThemeProvider>
                    <TranslationsProvider>
                        <RouterProvider
                            router={Router}
                        />
                    </TranslationsProvider>
                </MThemeProvider>
            </MQueryClientProvider>
        </PersistGate>
    </Provider>
);
