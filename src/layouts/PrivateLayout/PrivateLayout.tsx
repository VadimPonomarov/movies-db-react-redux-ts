import * as React from "react";
import {FC} from "react";

import {Outlet} from "react-router-dom";

const PrivateLayout: FC = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export {PrivateLayout};