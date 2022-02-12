import React from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../store/auth/selectors";
import styles from "./styles.module.css";

const Dashboard = () => {
  const { isLogged } = useSelector(selectAuthState);

  return (
    <div className={styles.container}>
      <h2>
        calendar will <br /> be here
      </h2>
      <p>isLogged: {isLogged?.toString()}</p>
    </div>
  );
};
export default Dashboard;
