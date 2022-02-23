import React, { FC, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import EventList from "../../molecules/EventList/EventList";
import {
  deleteScheduledThunk,
  getScheduledThunk
} from "../../../store/scheduled/thunks";
import { Scheduled } from "../../../domain";
import { selectScheduled } from "../../../store/scheduled/selectors";
import { Routes } from "../../../constants/routes";
import { useAppDispatch } from "../../../store";

const EventListScheduled: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getScheduledThunk());
  }, [dispatch]);

  const handleDeleteScheduled = useCallback(
    async (id: string) => {
      const data = await dispatch(deleteScheduledThunk(id)).unwrap();
      if (!data.error) {
        toast.success("Schedule cancelled");
      } else {
        toast.error("Schedule cancelled error");
      }
    },
    [dispatch]
  );

  const scheduled: Scheduled[] | undefined = useSelector(selectScheduled);

  const onButtonRoute = useCallback(
    () => history.push(Routes.DASHBOARD),
    [history]
  );

  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" onButtonRoute={onButtonRoute} />
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
