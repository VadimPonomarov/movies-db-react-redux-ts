import React from "react";

import {AuthRequiredProvider} from "common/hocs/AuthRequiredProvider";
import {LoginPage, RegistrationPage} from "pages";
import {MoviePage} from "pages/MoviePageContainer";
import {MoviesPage} from "pages/MoviesPageContainer";
import {NotFound404} from "pages/NotFound_404";
import {createBrowserRouter, Navigate} from "react-router-dom";

import {RegistrationRequiredProvider} from "./common/hocs";
import {MainLayout, PrivateLayout, PublicLayout} from "./layouts";


const Router = createBrowserRouter([
    {
        path: "", element: <MainLayout/>, errorElement: <NotFound404/>,
        children: [
            {
                element:
                    <AuthRequiredProvider>
                        <PrivateLayout/>
                    </AuthRequiredProvider>,
                children: [
                    {index: true, element: <Navigate to={"/popular"}/>},
                    {path: "/:category", element: <MoviesPage/>},
                    {path: "/:category/:movieId", element: <MoviePage/>},

                ],

            },
            {
                element: <PublicLayout/>, children: [
                    {
                        path: "/login", element:
                            <RegistrationRequiredProvider>
                                <LoginPage/>
                            </RegistrationRequiredProvider>
                    },
                    {path: "/registration", element: <RegistrationPage/>},
                ]
            }

        ],
    }])
;


export {Router};