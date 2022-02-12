import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthContainer from "../../molecules/AuthContainer";
import AuthForm from "../../molecules/AuthForm";
import { Routes } from "../../../constants/routes";
import { signUpThunk } from "../../../store/auth/thunks";

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = (email: string, password: string) => {
    dispatch(
      signUpThunk({
        authInput: {
          email,
          password
        },
        history
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
