import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthForm from "../../molecules/AuthForm";
import AuthContainer from "../../molecules/AuthContainer";
import { Routes } from "../../../constants/routes";
import { loginThunk } from "../../../store/auth/thunks";

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = (email: string, password: string) => {
    dispatch(
      loginThunk({
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
          text: "Sign up",
          href: Routes.SIGN_UP
        }}
        submit={{
          text: "Login",
          action: onLogin
        }}
      />
    </AuthContainer>
  );
};

export default Login;
