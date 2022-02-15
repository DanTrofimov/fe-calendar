import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import Calendar from "rc-year-calendar";
import { selectEvents } from "../../../store/events/selectors";
import { selectUser } from "../../../store/user/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import { getUserThunk } from "../../../store/user/thunks";
import { Event, User } from "../../../domain";
import "./styles.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getEventsThunk());
  }, [dispatch]);

  const user: User | null = useSelector(selectUser);
  const events: Event[] = useSelector(selectEvents);

  const preparedDataSource = events.map(
    ({ uid, summary, start, end, location }) => ({
      id: uid,
      location,
      startDate: new Date(start),
      endDate: new Date(end),
      name: summary
    })
  );

  return (
    <div className="calendar-container">
      <h2 className="email">{user?.email}</h2>
      <Calendar
        className="calendar"
        dataSource={preparedDataSource}
        year="2022"
        style="background"
      />
    </div>
  );
};
export default Dashboard;
