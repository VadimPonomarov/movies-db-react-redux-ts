import {
    BaseTextFieldProps,
} from "@mui/material/TextField/TextField";

import {formSchema} from "./formSchema";

export interface IFormFields<T> {
    [key: string]: {
        props?: { [key in keyof T]?: string };
    };
}

export interface IProps {
    props: {
        formLabel?: string;
        animate?: boolean;
    };
}

export type formInputType = typeof formSchema

export type FormTextFieldProps = BaseTextFieldProps

