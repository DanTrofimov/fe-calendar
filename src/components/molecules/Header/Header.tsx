import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Roles, User } from "../../../domain";
import { selectUser } from "../../../store/user/selectors";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../../store";
import { logoutThunk } from "../../../store/auth/thunks";
import { clearUser } from "../../../store/user/userSlice";
import { Routes } from "../../../constants/routes";

type HeaderProps = {
  buttonTitle: string;
  onButtonRoute: () => void;
  addButtonCallback?: () => void;
};

const Header: FC<HeaderProps> = ({
  buttonTitle,
  onButtonRoute = () => {},
  addButtonCallback = () => {}
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = useCallback(async () => {
    await dispatch(logoutThunk()).unwrap();
    dispatch(clearUser());

    history.replace(Routes.DASHBOARD);
  }, [dispatch, history]);

  const user: User | null = useSelector(selectUser);
  const isLogged = !!user?._id;

  return (
    <div className={styles.header}>
      <div className={styles.header__group}>
        {isLogged && (
          <Button size="small" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        )}
        {isLogged ? (
          <h2 className={styles.header__email}>{user?.email}</h2>
        ) : (
          <Link to={Routes.LOGIN}>
            <Button size="small" variant="contained">
              Login
            </Button>
          </Link>
        )}
      </div>
      {user?.role === Roles.ADMIN ? (
        <div className={styles.header__features}>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={onButtonRoute}
          >
            {buttonTitle}
          </Button>
        </div>
      ) : (
        <div className={styles.header__features}>
          {location.pathname === Routes.DASHBOARD && (
            <IconButton
              className={styles["header__add-button"]}
              onClick={addButtonCallback}
            >
              <AddIcon />
            </IconButton>
          )}
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={onButtonRoute}
          >
            {buttonTitle}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
