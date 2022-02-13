import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store";
import AuthForm from "../../molecules/AuthForm";
import AuthContainer from "../../molecules/AuthContainer";
import { Routes } from "../../../constants/routes";
import { loginThunk } from "../../../store/auth/thunks";
import { cleanInfo } from "../../../store/auth/authSlice";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onLogin = async (email: string, password: string) => {
    const { error } = await dispatch(
      loginThunk({
        email,
        password
      })
    ).unwrap();

    if (error) {
      toast.error("Ошибка");
    } else {
      toast.info(email);
      history.push(Routes.DASHBOARD);
    }

    dispatch(cleanInfo());
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
