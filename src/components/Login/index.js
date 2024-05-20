import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/base";
import { TextInput } from "@/components/form";
import { useAuth } from "@/contexts";
import {
  FORM_LOGIN,
  loginFormSchema,
  loginInitialValues,
} from "@/validations/loginSchema";

const Login = () => {
  const { doLogin } = useAuth();
  const methods = useForm({
    resolver: yupResolver(loginFormSchema()),
    defaultValues: loginInitialValues,
  });

  const handleLogin = (values) => {
    doLogin(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleLogin)}
        className="md:flex items-start"
      >
        <TextInput required name={FORM_LOGIN.EMAIL} placeholder="Email" />
        <TextInput
          required
          type="password"
          name={FORM_LOGIN.PASSWORD}
          placeholder="Password"
          className="md:mx-4 mt-2 md:mt-0"
        />
        <Button type="submit" className="mt-2 md:mt-0">
          Login / Register
        </Button>
      </form>
    </FormProvider>
  );
};

export default Login;
