import * as yup from "yup";

const formSchema = yup.object({
    name: yup.string().min(2).max(10).required(),
    password: yup.string().required(),
    rePassword: yup.string().oneOf([yup.ref("password")], "Not the same !!!"),
    token: yup.string()
});

export {formSchema};

