import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../../store/auth/selectors";
import { selectUser } from "../../../store/user/selectors";
import styles from "./styles.module.css";
import { getUserThunk } from "../../../store/user/thunks";
import Header from "../../molecules/Header";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { isLogged } = useSelector(selectAuthState);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header/>
      <h2>
        calendar will <br /> be here
      </h2>
      <p>isLogged: {isLogged?.toString()}</p>
      <p>User: {user?.email}</p>
    </div>
  );
};
export default Dashboard;
