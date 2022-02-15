import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../../store/events/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import styles from "./styles.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const events: Event[] = useSelector(selectEvents);

  useEffect(() => {
    dispatch(getEventsThunk());
  });

  return <div className={styles.container}>{JSON.stringify(events)}</div>;
};
export default Dashboard;
