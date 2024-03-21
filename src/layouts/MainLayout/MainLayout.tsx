import {FC, useEffect, useState} from "react";

import {Alert, LinearProgress} from "@mui/material";
import {MyAppBar} from "components/MyAppBarContainer/MyAppBar";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

import {SwipeAbleEdgeDrawer} from "../../components";
import {commonActions, commonSelectors, useAppDispatch} from "../../storage";

import css from "./index.module.scss";

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
                    className={css.LinearProgress}
                />}
            {!!showSuccess &&
                <Alert
                    className={css.Alert}
                    severity="success"
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