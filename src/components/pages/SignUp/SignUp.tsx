import React, { FC } from "react";
import { useDispatch } from "react-redux";
import AuthContainer from "../../molecules/AuthContainer";
import AuthForm from "../../molecules/AuthForm";
import { Routes } from "../../../constants/routes";
import { signUpThunk } from "../../../store/auth/thunks";

const SignUp: FC = () => {
  const dispatch = useDispatch();

  const onSignUp = (email: string, password: string) => {
    dispatch(
      signUpThunk({
        email,
        password
      })
    );
  };

  return (
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
          action: onSignUp
        }}
      />
    </AuthContainer>
  );
};

export default SignUp;
