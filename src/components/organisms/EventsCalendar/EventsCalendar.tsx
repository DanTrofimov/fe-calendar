import React, { FC } from "react";
// no npm deps @types/rc-year-calendar
// @ts-ignore
import Calendar from "rc-year-calendar";
import { Event } from "../../../domain";
import CalendarSceleton from "./CalendarSceleton";
import "./styles.css";

type EventsCalendarProps = {
  year: string;
  events: Event[];
  isLoading?: boolean;
};

const EventsCalendar: FC<EventsCalendarProps> = ({
  year,
  events,
  isLoading = false
}) => {
  const preparedEvents = events.map(
    ({ uid, summary, start, end, location }) => ({
      id: uid,
      location,
      startDate: new Date(start),
      endDate: new Date(end),
      name: summary
    })
  );

  return (
    <div>
      {isLoading ? (
        <CalendarSceleton />
      ) : (
        <Calendar
          className="calendar"
          dataSource={preparedEvents}
          year={year}
          style="background"
          weekStart={1}
        />
      )}
    </div>
  );
};

export default EventsCalendar;
