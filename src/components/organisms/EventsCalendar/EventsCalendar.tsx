import React, { FC } from "react";
// @ts-ignore
import Calendar from "rc-year-calendar";
import { Event } from "../../../domain";
import "./styles.css";

type EventsCalendarProps = {
  year: string;
  events: Event[];
};

const EventsCalendar: FC<EventsCalendarProps> = ({ year, events }) => {
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
    <Calendar
      className="calendar"
      dataSource={preparedEvents}
      year={year}
      style="background"
      weekStart={1}
    />
  );
};

export default EventsCalendar;
