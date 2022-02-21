import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { Request, Scheduled, Event } from "../../../domain";
import styles from "./styles.module.css";

type AdminRequestEventFormProps = {
  eventData: Request | Scheduled;
  onSubmit?: (
    allDay: boolean,
    description: string,
    end: string,
    start: string,
    location: string,
    summary: string
  ) => void;
  onCancel: () => void;
  onReject?: (id: string) => void;
  onApprove?: (id: string) => void;
  setIsRequestOpen?: (arg0: boolean) => void;
};

const AdminRequestEventForm: FC<AdminRequestEventFormProps> = ({
  eventData,
  onSubmit,
  onCancel,
  onApprove,
  onReject,
  setIsRequestOpen
}) => {
  const [scheduleDate, setScheduleDate] = useState(
    new Date(Date.now() + 10 * (60 * 1000))
  );

  const { summary, location, start, end, description, allDay, id } = eventData;

  const [formValues, setFormValues] = useState<Event>({
    summary: summary || "",
    location: location || "",
    start: start || new Date().toISOString(),
    end: end || new Date().toISOString(),
    description: description || "",
    allDay: allDay || false
  });

  const handleChange = (newValue: any, name: string) => {
    setFormValues({
      ...formValues,
      [name]: newValue
    });
  };

  const onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(
        formValues.allDay,
        formValues.description,
        formValues.end,
        formValues.start,
        formValues.location,
        formValues.summary
      );
    }
  };

  const handleAccept = () => {
    if (onApprove) {
      onApprove(id as string);
    }
    if (setIsRequestOpen) {
      setIsRequestOpen(false);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(id as string);
    }
    if (setIsRequestOpen) {
      setIsRequestOpen(false);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <p>Here will be JSX</p>
    </form>
  );
};

export default AdminRequestEventForm;
