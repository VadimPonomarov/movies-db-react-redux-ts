import * as React from "react";
import {FC, useContext} from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import {AuthContext} from "common/hocs/MyAuthContextProvider";

import {MyToolBar} from "./SubComponents/MyToolBar";
import {useSelector} from "react-redux";
import {authActions, authSelectors, useAppDispatch} from "../../storage";

const MyAppBar: FC = () => {
    const isAuth = useSelector(authSelectors.getIsAuth);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setIsAuth(event.target.checked));
    };


    return (
        <Box>
            <Box>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAuth}
                                onChange={handleChange}
                                sx={{zIndex: "1001"}}
                            />
                        }
                        label={isAuth ? "Logout" : "Login"}
                    />
                </FormGroup>
                <AppBar position="static">
                    <MyToolBar/>
                </AppBar>
            </Box>
        </Box>
    );
};

export {MyAppBar};