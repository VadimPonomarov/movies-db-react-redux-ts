import * as React from "react";
import {FC} from "react";

import {Box} from "@mui/material";

import {RegistrationForm} from "../../forms";

const RegistrationPage: FC = () => {
    return (
        <Box>
            <RegistrationForm props={{formLabel: "Registration Form"}}/>
        </Box>
    );
};

export {RegistrationPage};