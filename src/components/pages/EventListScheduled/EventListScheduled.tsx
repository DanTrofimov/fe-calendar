import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import EventList from "../../molecules/EventList/EventList";
import {
  deleteScheduledThunk,
  getScheduledThunk,
} from "../../../store/scheduled/thunks";
import { Scheduled } from "../../../domain";
import { selectScheduled } from "../../../store/scheduled/selectors";
import { Routes } from "../../../constants/routes";
import { useAppDispatch } from "../../../store";

const EventListScheduled: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getScheduledThunk());
  }, [dispatch]);

  const handleDeleteScheduled = async (id: string) => {
    const data = await dispatch(deleteScheduledThunk(id)).unwrap();
    if (!data.error) {
      toast.success("Schedule cancelled");
    } else {
      toast.error("Schedule cancelled error");
    }
  };

  const scheduled: Scheduled[] | undefined = useSelector(selectScheduled);

  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" buttonRouter={Routes.DASHBOARD} />
      <div className={styles.content}>
        <h1>Scheduled Events</h1>
        {scheduled?.length ? (
          <EventList
            list={scheduled}
            buttonTitle="More"
            handleDeleteRequest={handleDeleteScheduled}
          />
        ) : (
          <p>Уведомлений не создано или они были выполнены</p>
        )}
      </div>
    </div>
  );
};

export default EventListScheduled;
