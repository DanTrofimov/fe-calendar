import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store";
import { selectEvents, selectLoading } from "../../../store/events/selectors";
import { getEventsThunk } from "../../../store/events/thunks";
import Header from "../../molecules/Header";
import { Event, Roles, User } from "../../../domain";
import EventsCalendar from "../../organisms/EventsCalendar";
import YearSelect from "../../atoms/YearSelect";
import styles from "./styles.module.css";
import { setLoading } from "../../../store/events/eventsSlice";
import ModalComponent from "../../molecules/ModalComponent/ModalComponent";
import { Routes } from "../../../constants/routes";
import { selectUser } from "../../../store/user/selectors";
import ScheduleEventForm from "../../molecules/ScheduleEventForm";
import RequestEventForm from "../../molecules/RequestEventForm";
import AuthInfo from "../../molecules/AuthInfo";
import { postScheduledThunk } from "../../../store/scheduled/thunks";
import { postRequestThunk } from "../../../store/requests/thunks";

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const [isScheduledOpen, setIsScheduledOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const user: User | null = useSelector(selectUser);
  const isLogged = !!user?._id;

  useEffect(() => {
    dispatch(setLoading(true));
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

  const selectedEvent = useMemo(
    () =>
      events.find(
        ({ uid, _id }) => uid === selectedEventId || _id === selectedEventId
      ) ?? events[0],
    [events, selectedEventId]
  );

  const onDayClick = useCallback(
    (e: any) => {
      if (user?.role === Roles.ADMIN) {
        return;
      }

      if (e?.events[0]?.id) {
        setSelectedEventId(e.events[0].id);
        setIsScheduledOpen(true);
      }
    },
    [user?.role]
  );

  const onScheduleSubmit = useCallback(
    async (_id: string, uid: string, date: string) => {
      if (isLogged) {
        const data = await dispatch(
          postScheduledThunk({ _id, uid, date })
        ).unwrap();
        if (!data.error) {
          toast.success("Has scheduled event");
        } else {
          toast.error("Schedule error");
        }
        setIsScheduledOpen(false);
      } else {
        setIsScheduledOpen(false);
        setIsAuthModalOpen(true);
      }
    },
    [dispatch, isLogged]
  );

  const onRequestSubmit = useCallback(
    async (event: Event) => {
      const data = await dispatch(postRequestThunk(event)).unwrap();
      if (!data.error) {
        toast.success("Has requested event");
      } else {
        toast.error("Request error");
      }
      setIsRequestOpen(false);
    },
    [dispatch]
  );

  const onButtonRoute = useCallback(() => {
    if (isLogged) {
      history.push(
        user?.role === Roles.ADMIN ? Routes.REQUESTS : Routes.SCHEDULED
      );
    } else {
      setIsAuthModalOpen(true);
    }
  }, [history, isLogged, user?.role]);

  const addButtonCallback = useCallback(() => {
    if (isLogged) {
      setIsRequestOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  }, [isLogged]);

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
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      >
        <AuthInfo />
      </ModalComponent>
      <ModalComponent
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      >
        <RequestEventForm
          onSubmit={onRequestSubmit}
          onCancel={() => setIsRequestOpen(false)}
        />
      </ModalComponent>
      <Header
        buttonTitle={user?.role === Roles.ADMIN ? "Requests" : "Scheduled"}
        onButtonRoute={onButtonRoute}
        addButtonCallback={addButtonCallback}
      />
      <div className={styles["year-select-container"]}>
        <YearSelect
          options={years}
          value={year}
          setValue={setYear}
          label="Chosen year"
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
