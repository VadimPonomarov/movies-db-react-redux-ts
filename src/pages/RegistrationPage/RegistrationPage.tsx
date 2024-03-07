import * as React from "react";

import { Box } from "@mui/material";

import {MyRegistrationForm} from "../../forms";

const RegistrationPage = () => {
    return (
        <Box>
            <MyRegistrationForm props={{formLabel: "Registration Form"}}/>
        </Box>
    );
};

export {RegistrationPage}