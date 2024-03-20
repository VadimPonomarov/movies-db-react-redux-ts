import * as React from "react";
import {FC} from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {authActions, authSelectors, useAppDispatch} from "../../storage";

import css from "./index.module.scss";
import {MyToolBar} from "./SubComponents/MyToolBar";

const MyAppBar: FC = () => {
    const isAuth = useSelector(authSelectors.getIsAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void =
        (event) => {
            dispatch(authActions.setIsAuth(event.target.checked));
            navigate("/login");
        };

    return (
        <Box>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            className={css.Switch}
                            checked={isAuth}
                            onChange={handleChange}
                        />
                    }
                    label={isAuth ? "Logout" : "Login"}
                />
            </FormGroup>
            <AppBar position="static">
                <MyToolBar/>
            </AppBar>
        </Box>
    );
};

export {MyAppBar};