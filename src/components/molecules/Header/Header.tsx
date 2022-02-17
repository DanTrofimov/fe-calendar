import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { Roles, User } from "../../../domain";
import { selectUser } from "../../../store/user/selectors";
import { selectAuthState } from "../../../store/auth/selectors";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../../store";
import { logoutThunk } from "../../../store/auth/thunks";
import { clearUser } from "../../../store/user/userSlice";
import { Routes } from "../../../constants/routes";

type HeaderProps = {
  buttonTitle: string;
  buttonRouter: Routes;
};

const Header: FC<HeaderProps> = ({ buttonTitle, buttonRouter }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(clearUser());

    history.replace(Routes.DASHBOARD);
  };

  const { isLogged } = useSelector(selectAuthState);
  const user: User | null = useSelector(selectUser);

  return (
    <div className={styles.header}>
      <div className={styles.header__group}>
        {isLogged && (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        )}
        {isLogged ? (
          <h2 className={styles.header__item}>{user?.email}</h2>
        ) : (
          <Link to={Routes.LOGIN}>
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </div>
      {user?.role === Roles.ADMIN ? (
        <div className={styles.header__features}>
          <Link to={buttonRouter}>
            <Button variant="contained" color="success">
              {buttonTitle}
            </Button>
          </Link>
        </div>
      ) : (
        <div className={styles.header__features}>
          <Button variant="contained" className={styles.header__item}>
            +
          </Button>
          <Link to={buttonRouter}>
            <Button variant="contained" color="success">
              {buttonTitle}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
