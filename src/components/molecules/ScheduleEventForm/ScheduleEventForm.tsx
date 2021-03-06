import React, { FC, useState, useCallback, useMemo } from "react";
import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import ru from "date-fns/locale/ru";
import { Event } from "../../../domain";
import styles from "./styles.module.css";

type ScheduleEventFormProps = {
  event: Event;
  onSubmit: (id: string, uid: string, scheduledDate: string) => void;
  onCancel: () => void;
};

const ScheduleEventForm: FC<ScheduleEventFormProps> = ({
  event,
  onSubmit,
  onCancel
}) => {
  const [scheduleDate, setScheduleDate] = useState(
    new Date(Date.now() + 10 * (60 * 1000))
  );

  const {
    _id,
    uid,
    start: startDate,
    end: endDate,
    summary: title,
    description,
    location
  } = event;

  const dateFormat = "LLL d hh:mm b";

  const range = useMemo(
    () =>
      `${format(new Date(startDate), dateFormat)} - ${format(
        new Date(endDate),
        dateFormat
      )}`,
    [startDate, endDate]
  );

  const handleChangeDate = useCallback((newValue: any) => {
    setScheduleDate(newValue);
  }, []);

  const onFormSubmit = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(_id as string, uid as string, scheduleDate.toISOString());
  }, [_id, onSubmit, scheduleDate, uid]);

  return (
    <form onSubmit={onFormSubmit}>
      <h2>{title}</h2>
      <p>📍 {location}</p>
      <p>📆 {range}</p>
      <p>
        🔗{" "}
        <a href={description} target="_blank" rel="noreferrer">
          Подробнее о событии тут
        </a>
      </p>
      <div className={styles["date-input-container"]}>
        <p>Notify at:</p>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
          <DateTimePicker
            label=""
            minDateTime={Date.now() + 5 * (60 * 1000)}
            value={scheduleDate}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles["button-container"]}>
        <Button variant="contained" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          size="small"
          type="submit"
          disabled={scheduleDate < new Date(Date.now() + 5 * (60 * 1000))}
        >
          Schedule
        </Button>
      </div>
    </form>
  );
};

export default ScheduleEventForm;
