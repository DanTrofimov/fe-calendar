import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
// import EventList from '../../molecules/EventList/EventList'
import { getScheduledThunk } from "../../../store/scheduled/thunks";
import { Scheduled } from "../../../domain";
import { selectScheduled } from "../../../store/scheduled/selectors";
import { Routes } from "../../../constants/routes";

const EventListScheduled: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScheduledThunk());
  }, [dispatch]);

  const scheduled: Scheduled[] | null = useSelector(selectScheduled);

  console.log(scheduled);
  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" buttonRouter={Routes.DASHBOARD} />
      <div className={styles.content}>
        <h1>Scheduled Events</h1>
      </div>
    </div>
  );
};

export default EventListScheduled;
