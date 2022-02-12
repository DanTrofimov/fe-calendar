import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthForm from "../../molecules/AuthForm";
import AuthContainer from "../../molecules/AuthContainer";
import { Routes } from "../../../constants/routes";
import { loginThunk } from "../../../store/auth/thunks";
import { selectAuthState } from "../../../store/auth/selectors";
import { cleanInfo } from "../../../store/auth/authSlice";

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLogged } = useSelector(selectAuthState);

  const onLogin = async (email: string, password: string) => {
    await dispatch(
      loginThunk({
        email,
        password
      })
    );

    if (isLogged) {
      toast.info(email);
      history.push(Routes.DASHBOARD);
    } else {
      toast.error("Ошибка");
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
