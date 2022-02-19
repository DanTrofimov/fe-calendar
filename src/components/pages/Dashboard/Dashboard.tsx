import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store";
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
import RequestEventForm from "../../molecules/RequestEventForm";
import { postScheduledThunk } from "../../../store/scheduled/thunks";

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const [isScheduledOpen, setIsScheduledOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState("");

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

  const selectedEvent =
    events.find(
      ({ uid, _id }) => uid === selectedEventId || _id === selectedEventId
    ) ?? events[0];

  const onDayClick = (e: any) => {
    if (e?.events[0]?.id) {
      setSelectedEventId(e.events[0].id);
      setIsScheduledOpen(true);
    }
  };

  const onScheduleSubmit = async (_id: string, uid: string, date: string) => {
    const data = await dispatch(
      postScheduledThunk({ _id, uid, date })
    ).unwrap();
    if (!data.error) {
      toast.success("Has scheduled event");
    } else {
      toast.error("Schedule error");
    }
    setIsScheduledOpen(false);
  };

  return (
    <div className={styles["calendar-container"]}>
      <ModalComponent
        isOpen={isScheduledOpen}
        onClose={() => setIsScheduledOpen(false)}
      >
        <ScheduleEventForm
          event={selectedEvent}
          onSubmit={onScheduleSubmit}
          onCancel={() => setIsScheduledOpen(false)}
        />
      </ModalComponent>
      <ModalComponent
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      >
        <RequestEventForm
          onSubmit={onScheduleSubmit}
          onCancel={() => setIsRequestOpen(false)}
        />
      </ModalComponent>
      <Header
        buttonTitle={user?.role === Roles.ADMIN ? "Requests" : "Scheduled"}
        buttonRouter={
          user?.role === Roles.ADMIN ? Routes.REQUESTS : Routes.SCHEDULED
        }
        addButtonCallback={() => setIsRequestOpen(true)}
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
        onDayClick={onDayClick}
      />
    </div>
  );
};
export default Dashboard;
