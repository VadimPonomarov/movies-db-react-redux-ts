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
            disabled: true,
            type: "password",
            value: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWJjNTViODgxZDJiZWRmNjg0NmNkNzJlNzg2N2U3YSIsInN1YiI6IjYyMDExNDhlZTU0ZDVkMDA0M2NiOWU0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.czjbT6wILLJPi_087zCSZ4uMKaetwvJsx6PLikypiFM"
        }
    }
};

export {formFields};
