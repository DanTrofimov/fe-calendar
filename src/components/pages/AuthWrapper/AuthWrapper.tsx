import React, { ReactNode, FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserThunk } from "../../../store/user/thunks";
import { selectUser } from "../../../store/user/selectors";
import { User } from "../../../domain";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();
  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      dispatch(getUserThunk());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
};

export default AuthWrapper;
