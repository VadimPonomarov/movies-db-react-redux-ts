import {MyAppBar} from "components/MyAppBarContainer/MyAppBar";
import {Outlet} from "react-router-dom";

import {SwipeableEdgeDrawer} from "../../components";
import {useSelector} from "react-redux";
import {commonSelectors} from "../../storage";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../common/hocs";


const MainLayout = () => {
    const themeIsDark = useSelector(commonSelectors.getThemeIsDark);
    const {
        setTheme
    } = useContext(AuthContext);

    useEffect(() => {
        setTheme(themeIsDark ? "light" : "dark");
    }, [setTheme, themeIsDark]);

    return (
        <>
            <MyAppBar/>
            <SwipeableEdgeDrawer/>
            <Outlet/>
        </>
    );
};

export {MainLayout};