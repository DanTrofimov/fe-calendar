import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { User } from "../../../domain";
import { selectUser } from "../../../store/user/selectors";
import { selectAuthState } from "../../../store/auth/selectors";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../../store";
import { logoutThunk } from "../../../store/auth/thunks";
import { clearUser } from "../../../store/user/userSlice";
import { Routes } from "../../../constants/routes";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(clearUser());

    history.replace(Routes.DASHBOARD);
  };

  const { isLogged } = useSelector(selectAuthState);
  const user: User | null = useSelector(selectUser);
  // TODO добавить функционал админа
  return (
    <div className={styles.header}>
      <div className={styles.header__group}>
        {isLogged ? (
          <h2 className={styles.header__email}>{user?.email}</h2>
        ) : (
          <Link to={Routes.LOGIN}>
            <Button size="small" variant="contained">
              Login
            </Button>
          </Link>
        )}
        {isLogged && (
          <Button variant="contained" size="small" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
      <div className={styles.header__features}>
        <IconButton
          size="small"
          className={styles.add_event_button}
        >
          <AddIcon />
        </IconButton>
        <Button variant="contained" size="small" color="success">
          Scheduled
        </Button>
      </div>
    </div>
  );
};

export default Header;
