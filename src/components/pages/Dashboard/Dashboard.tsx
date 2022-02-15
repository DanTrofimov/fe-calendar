import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../../store/events/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import styles from "./styles.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const events: Event[] = useSelector(selectEvents);

  // useEffect(() => {
  //   dispatch(getEventsThunk());
  // }, [dispatch]);

  return <pre className={styles.container}>{JSON.stringify(events)}</pre>;
};
export default Dashboard;
