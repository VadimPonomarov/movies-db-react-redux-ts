import React from "react";

import {MyQueryClientProvider} from "common/hocs";
import {MyAuthContextProvider} from "common/hocs/MyAuthContextProvider";
import {MyThemeProviderMain} from "common/hocs/MyThemeProviderMain";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './storage';
import {Provider} from 'react-redux';

import {Router} from "./router";

import "./index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <MyAuthContextProvider>
        <MyThemeProviderMain>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MyQueryClientProvider>
                        <RouterProvider router={Router}/>
                    </MyQueryClientProvider>
                </PersistGate>
            </Provider>
        </MyThemeProviderMain>
    </MyAuthContextProvider>
);
