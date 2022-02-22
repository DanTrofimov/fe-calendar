import React, { ReactNode, FC, useEffect } from "react";
import { getUserThunk } from "../../../store/user/thunks";
import { useAppDispatch } from "../../../store";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      await dispatch(getUserThunk()).unwrap();
    };
    getUser();
  });

  return <div>{children}</div>;
};

export default AuthWrapper;
