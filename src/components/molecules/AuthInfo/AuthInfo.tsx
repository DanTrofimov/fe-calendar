import React, { FC, useCallback } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import { Routes } from "../../../constants/routes";

const AuthModal: FC = () => {
  const history = useHistory();
  const onClick = useCallback(() => history.push(Routes.LOGIN), [history]);

  return (
    <div className={styles["auth-modal-container"]}>
      <h2>Авторизация</h2>
      <p>
        Войдите в аккаунт чтобы добавить событие в календарь или иметь
        возможность запланировать его.
      </p>
      <div className={styles["button-container"]}>
        <Button
          onClick={onClick}
          variant="contained"
          className={styles["auth-button"]}
        >
          Войти в аккаунт
        </Button>
      </div>
    </div>
  );
};

export default AuthModal;
