import React, {FC, useState} from "react";
import {Button, TextField, Checkbox} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Event} from "../../../domain";
import styles from "./styles.module.css";

type RequestsEventFormProps = {
  onSubmit?: (allDay: boolean, description: string, end: string, start: string, location: string, summary: string) => void;
  onCancel: () => void;
  onReject?: (id: string) => void;
  onApprove?: (id: string) => void;
  summary?: string,
  location?: string,
  start?: string,
  end?: string,
  description?: string,
  allDay?: boolean,
  readOnly?: boolean,
  id?: string,
  setIsRequestOpen?: (arg0: boolean) => void;
};

const RequestEventForm: FC<RequestsEventFormProps> = ({
                                                        onSubmit,
                                                        onCancel,
                                                        onApprove,
                                                        onReject,
                                                        summary,
                                                        location,
                                                        start,
                                                        end,
                                                        description,
                                                        allDay,
                                                        readOnly,
                                                        id,
                                                        setIsRequestOpen
                                                      }) => {
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
        formValues.summary);
    }
  };

  const handleAccept = () => {
    if (onApprove) {
      onApprove(id as string);
    }
    if (setIsRequestOpen) {
      setIsRequestOpen(false);
    }
  }

  const handleReject = () => {
    if (onReject) {
      onReject(id as string);
    }
    if (setIsRequestOpen) {
      setIsRequestOpen(false);
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h2>Event request</h2>
      <div className={styles["input-container"]}>
        <p>💬</p>
        <TextField
          label="Name"
          size="small"
          value={formValues.summary}
          disabled={readOnly}
          onChange={(e) => handleChange(e.target.value, "summary")}
        />
      </div>
      <div className={styles["input-container"]}>
        <p>📍</p>
        <TextField
          label="Place"
          size="small"
          value={formValues.location}
          disabled={readOnly}
          onChange={(e) => handleChange(e.target.value, "location")}
        />
      </div>
      <div className={styles["input-container"]}>
        <p>📆</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Starts at"
            value={new Date(formValues.start)}
            disabled={readOnly}
            onChange={(value) => handleChange(value?.toISOString(), "start")}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles["input-container"]}>
        <p>📆</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Ends at"
            value={new Date(formValues.end)}
            disabled={readOnly}
            onChange={(value) => handleChange(value?.toISOString(), "end")}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles["input-container"]}>
        <p>🔗</p>
        <TextField
          label="Link"
          size="small"
          value={formValues.description}
          disabled={readOnly}
          onChange={(e) => handleChange(e.target.value, "description")}
        />
      </div>
      <div className={styles["checkbox-container"]}>
        <Checkbox
          value={formValues.allDay}
          disabled={readOnly}
          onChange={(e) => handleChange(e.target.checked, "allDay")}
          inputProps={{"aria-label": "controlled"}}
        />
        <div className={styles["checkbox-label"]}>is all day?</div>
      </div>
      {onApprove && onReject
        ? (<div className={styles["button-container"]}>
          <Button variant="contained" color="error" size="small" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="contained" color="success" size="small" onClick={handleAccept}>
            Approve
          </Button>
        </div>)
        : (<div className={styles["button-container"]}>
          <Button variant="contained" size="small" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="success" size="small">
            Request
          </Button>
        </div>)
      }
    </form>
  );
};

export default RequestEventForm;
