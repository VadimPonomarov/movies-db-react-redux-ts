import * as React from "react";
import {FC, useContext} from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import {AuthContext} from "common/hocs/MyAuthContextProvider";

import {MyToolBar} from "./SubComponents/MyToolBar";

const MyAppBar: FC = () => {
    const {isAuth: auth, setIsAuth: setAuth} = useContext(AuthContext);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };


    return (
        <Box>
            <Box>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={auth}
                                onChange={handleChange}
                                sx={{zIndex: "1001"}}
                            />
                        }
                        label={auth ? "Logout" : "Login"}
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