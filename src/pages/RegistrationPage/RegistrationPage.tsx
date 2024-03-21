import * as React from "react";
import {FC} from "react";

import {Box} from "@mui/material";

import {MyRegistrationForm} from "../../forms";

const RegistrationPage: FC = () => {
    return (
        <Box>
            <MyRegistrationForm props={{formLabel: "Registration Form"}}/>
        </Box>
    );
};

export {RegistrationPage};