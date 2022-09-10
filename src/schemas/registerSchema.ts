import * as yup from "yup";

const registerSchema = yup
    .object({
        firstName: yup.string().required("First name is required."),
        lastName: yup.string().required("Last name is required."),
        email: yup.string().required("Email is required."),
        password: yup.string().required("Password is required."),
        confirmPassword: yup.string().required("Confirm password is required.")
    })
    .required();

export { registerSchema };
