import {MyAppBar} from "components/MyAppBarContainer/MyAppBar";
import {Outlet} from "react-router-dom";

import {SwipeableEdgeDrawer} from "../../components";

const MainLayout = () => {
    return (
        <>
            <MyAppBar/>
            <SwipeableEdgeDrawer/>
            <Outlet/>
        </>
    );
};

export {MainLayout};