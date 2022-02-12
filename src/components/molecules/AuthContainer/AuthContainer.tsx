import React, { FC, ReactNode } from "react";
import styles from "./styles.module.css";

type AuthContainerProps = {
  children: ReactNode;
};

const AuthContainer: FC<AuthContainerProps> = ({ children }) => (
  <div className={styles.authContainer}>{children}</div>
);

export default AuthContainer;
