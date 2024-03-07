import * as React from "react";
import {FC} from "react";

import {Outlet} from "react-router-dom";


const PublicLayout: FC = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export {PublicLayout};