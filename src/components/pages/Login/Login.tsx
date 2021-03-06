import React, { FC, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import AuthForm from "../../molecules/AuthForm";
import AuthContainer from "../../molecules/AuthContainer";
import { Routes } from "../../../constants/routes";
import { loginThunk } from "../../../store/auth/thunks";
import { cleanInfo } from "../../../store/auth/authSlice";
import { selectUser } from "../../../store/user/selectors";
import { User } from "../../../domain";
import { getUserThunk } from "../../../store/user/thunks";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    if (user?._id) {      
      history.goBack();
    }
  });

  const onLogin = useCallback(
    async (email: string, password: string) => {
      const data = await dispatch(
        loginThunk({
          email,
          password
        })
      ).unwrap();

      if (data?.error) {
        toast.error("Ошибка");
      } else {
        toast.info(email);
        dispatch(getUserThunk());
        history.push(Routes.DASHBOARD);
      }

      dispatch(cleanInfo());
    },
    [dispatch, history]
  );

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
