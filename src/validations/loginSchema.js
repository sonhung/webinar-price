import * as Yup from "yup";

const FORM_LOGIN = {
  EMAIL: "email",
  PASSWORD: "password",
};

const loginInitialValues = {
  [FORM_LOGIN.EMAIL]: "",
  [FORM_LOGIN.PASSWORD]: "",
};

const loginFormSchema = () =>
  Yup.object().shape({
    [FORM_LOGIN.EMAIL]: Yup.string()
      .email("Email is not a valid!")
      .required("Please input your email"),
    [FORM_LOGIN.PASSWORD]: Yup.string()
      .required("Please input your password")
      .min(8, 'Password must be at least 8 characters'),
  });

export { loginFormSchema, loginInitialValues, FORM_LOGIN };
