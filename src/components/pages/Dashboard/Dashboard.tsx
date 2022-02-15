import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../../store/events/selectors";
import { selectUser } from "../../../store/user/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import { getUserThunk } from "../../../store/user/thunks";
import { Event, User } from "../../../domain";
import EventsCalendar from "../../organisms/EventsCalendar";
import styles from "./styles.module.css";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2021);

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getEventsThunk(year.toString()));
  }, [dispatch, year]);

  const user: User | null = useSelector(selectUser);
  const events: Event[] = useSelector(selectEvents);

  return (
    <div className={styles["calendar-container"]}>
      <h2 className="email">{user?.email}</h2>
      <EventsCalendar year={year.toString()} events={events} />
    </div>
  );
};
export default Dashboard;
