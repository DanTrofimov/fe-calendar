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
  // component's event type has a too complex structure
  onDayClick: (e: any) => void;
};

const EventsCalendar: FC<EventsCalendarProps> = ({
  year,
  events,
  isLoading = false,
  onDayClick
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
          onDayClick={onDayClick}
        />
      )}
    </div>
  );
};

export default EventsCalendar;
