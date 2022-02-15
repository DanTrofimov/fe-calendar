import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../../store/events/selectors";
import { selectUser } from "../../../store/user/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import { getUserThunk } from "../../../store/user/thunks";
import styles from "./styles.module.css";
import { User } from "../../../domain";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return <pre className={styles.container}>{user?.toString()}</pre>;
};
export default Dashboard;
