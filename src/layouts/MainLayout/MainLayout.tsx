import {MyAppBar} from "components/MyAppBarContainer/MyAppBar";
import {Outlet} from "react-router-dom";

import {SwipeAbleEdgeDrawer} from "../../components";

const MainLayout = () => {

    return (
        <>
            <MyAppBar/>
            <SwipeAbleEdgeDrawer/>
            <Outlet/>
        </>
    );
};

export {MainLayout};