import * as React from "react";

import {capitalize, TextField} from "@mui/material";
import {useFormContext} from "react-hook-form";

import {FormTextFieldProps} from "./formTypes";

interface IProps {
    name: string;
    label?: string;
    extraProps?: FormTextFieldProps | {};
}

const FormField = React.memo(({name, label, extraProps}: IProps) => {
    const {register, formState: {errors}} = useFormContext();
    return (
        <>
            <TextField
                {...register(name)}
                label={capitalize(label ? label : name)}
                focused
                error={!!errors[name]}
                helperText={errors[name]?.message.toString()}
                fullWidth
                {...extraProps}
            />
        </>
    );
});

export {FormField};