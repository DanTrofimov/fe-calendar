import React, { FC } from "react";
import AuthContainer from "../../molecules/AuthContainer";
import AuthForm from "../../molecules/AuthForm";
import { Routes } from "../../../constants/routes";

const SignUp: FC = () => (
  <AuthContainer>
    <img
      src={`${process.env.PUBLIC_URL}/logo512.png`}
      alt="Frontend Events logo"
    />
    <h1>Frontend Events</h1>
    <AuthForm
      link={{
        text: "Login",
        href: Routes.LOGIN
      }}
      submit={{
        text: "Sign up",
        action: (email, password) => console.log(email, password)
      }}
    />
  </AuthContainer>
);

export default SignUp;
