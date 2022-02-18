import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents, selectLoading } from "../../../store/events/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import { getUserThunk } from "../../../store/user/thunks";
import Header from "../../molecules/Header";
import { Event, Roles, User } from "../../../domain";
import EventsCalendar from "../../organisms/EventsCalendar";
import YearSelect from "../../atoms/YearSelect";
import styles from "./styles.module.css";
import { setLoading } from "../../../store/events/eventsSlice";
import ModalComponent from "../../molecules/ModalComponent/ModalComponent";
import { Routes } from "../../../constants/routes";
import { selectUser } from "../../../store/user/selectors";
import { setIsLogged } from "../../../store/auth/authSlice";
import ScheduleEventForm from "../../molecules/ScheduleEventForm";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const [isOpen, setIsOPen] = useState(true);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getUserThunk());
    dispatch(getEventsThunk(year));
  }, [dispatch, year]);

  const generateArrayOfYears = () => {
    const max = new Date().getFullYear();
    const min = 2016;
    const years = [];

    for (let i = min; i <= max; i += 1) {
      years.push(i.toString());
    }
    return years;
  };

  const years = generateArrayOfYears();

  const events: Event[] = useSelector(selectEvents);
  const isLoading: boolean = useSelector(selectLoading);
  const user: User | null = useSelector(selectUser);

  if (user?._id) dispatch(setIsLogged(true));

  const mockEvent: Event = {
    uid: "2022-01-18-digital-a11y-conf",
    start: "2022-01-18T00:00:00.000Z",
    end: "2022-02-09T00:00:00.000Z",
    summary: "Конференция по цифровой доступности (онлайн)",
    location: "Москва",
    description: "https://facebook.com/events/4783636631715537",
    allDay: true
  };

  return (
    <div className={styles["calendar-container"]}>
      <ModalComponent isOpen={isOpen} onClose={() => setIsOPen(false)}>
        <ScheduleEventForm
          event={mockEvent}
          onSubmit={() => setIsOPen(false)}
          onCancel={() => setIsOPen(false)}
        />
      </ModalComponent>
      <Header
        buttonTitle={user?.role === Roles.ADMIN ? "Requests" : "Scheduled"}
        buttonRouter={
          user?.role === Roles.ADMIN ? Routes.REQUESTS : Routes.SCHEDULED
        }
      />
      <div className={styles["year-select-container"]}>
        <YearSelect
          options={years}
          value={year}
          setValue={setYear}
          label="Current year"
        />
      </div>
      <EventsCalendar
        isLoading={isLoading}
        year={year.toString()}
        events={events}
      />
    </div>
  );
};
export default Dashboard;
