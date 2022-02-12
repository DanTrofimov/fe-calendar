import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContainer from "../../molecules/AuthContainer";
import AuthForm from "../../molecules/AuthForm";
import { Routes } from "../../../constants/routes";
import { signUpThunk } from "../../../store/auth/thunks";
import { selectAuthState } from "../../../store/auth/selectors";
import { cleanInfo } from "../../../store/auth/authSlice";

const SignUp: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error } = useSelector(selectAuthState);

  const onSignUp = async (email: string, password: string) => {
    await dispatch(
      signUpThunk({
        email,
        password
      })
    );

    if (error) {
      toast.error("Ошибка");
    } else {
      toast.info(email);
      history.push(Routes.LOGIN);
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
