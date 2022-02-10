import React, { FC } from "react";
import AuthForm from "../../molecules/AuthForm";
import AuthContainer from "../../molecules/AuthContainer";
import { Routes } from "../../../constants/routes";

const Login: FC = () => (
  <AuthContainer>
    <img
      src={`${process.env.PUBLIC_URL}/logo512.png`}
      alt="Frontend Events logo"
    />
    <h1>Frontend Events</h1>
    <AuthForm
      link={{
        text: "Sign up",
        href: Routes.SIGN_UP
      }}
      submit={{
        text: "Login",
        action: (email, password) => console.log(email, password)
      }}
    />
  </AuthContainer>
);

export default Login;
