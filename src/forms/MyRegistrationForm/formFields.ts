import {FormTextFieldProps, IFormFields} from "./formTypes";

const formFields: IFormFields<FormTextFieldProps> = {
    name: {
        props: {
            variant: "standard",
        },
    },
    password: {
        props: {
            variant: "standard",
            type: "password"
        },
    },
    rePassword: {
        props: {
            variant: "standard",
            type: "password"
        },
    },
    token: {
        props: {
            variant: "standard",
            multiline: true,
            maxRows: "10"
        }
    }
};

export {formFields};
