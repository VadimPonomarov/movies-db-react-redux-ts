import {FC, useEffect, useState} from "react";

import {Alert, LinearProgress} from "@mui/material";
import {MyAppBar} from "components/MyAppBarContainer/MyAppBar";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

import {SwipeAbleEdgeDrawer} from "../../components";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

const MainLayout: FC = () => {
    const isLoading = useSelector(commonSelectors.getIsLoading);
    const isSuccess = useSelector(commonSelectors.getIsSuccess);
    const [showSuccess, setShowSuccess] =
        useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        if (!!isSuccess) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                dispatch(commonActions.setIsSuccess(undefined));
            }, 2000);
        }
    }, [dispatch, isSuccess]);

    return (
        <>
            <MyAppBar/>
            {!!isLoading &&
                <LinearProgress
                    sx={{
                        position: "absolute",
                        width: "100vw",
                        top: "0px",
                        zIndex: 1400
                    }}
                />}
            {!!showSuccess &&
                <Alert
                    severity="success"
                    sx={{
                        position: "absolute",
                        width: "100vw",
                        top: 0,
                        zIndex: 1400
                    }}
                >
                    {_.capitalize(t("success"))}
                </Alert>
            }
            <SwipeAbleEdgeDrawer/>
            <Outlet/>
        </>
    );
};

export {MainLayout};