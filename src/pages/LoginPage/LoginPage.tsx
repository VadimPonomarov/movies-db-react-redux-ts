import * as React from "react";
import {FC} from "react";

import {Box} from "@mui/material";

import {LoginForm} from "../../forms";


const LoginPage: FC = () => {
    return (
        <Box>
            <LoginForm
                props={{
                    formLabel: "Login Form"
                }}/>
        </Box>
    );
};

export {LoginPage};