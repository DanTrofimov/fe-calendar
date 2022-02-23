import React, { FC, useState } from "react";
import { Button, TextField, Checkbox } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ru from "date-fns/locale/ru";
import { Event } from "../../../domain";
import styles from "./styles.module.css";

type RequestsEventFormProps = {
  onSubmit: (eventData: Event) => void;
  onCancel: () => void;
};

const RequestEventForm: FC<RequestsEventFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [formValues, setFormValues] = useState<Event>({
    summary: "",
    location: "",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    description: "",
    allDay: false
  });

  const handleChange = (newValue: any, name: string) => {
    setFormValues({
      ...formValues,
      [name]: newValue
    });
  };

  const onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h2>Event request</h2>
      <div className={styles["input-container"]}>
        <p>💬</p>
        <TextField
          label="Name"
          size="small"
          value={formValues.summary}
          onChange={(e) => handleChange(e.target.value, "summary")}
        />
      </div>
      <div className={styles["input-container"]}>
        <p>📍</p>
        <TextField
          label="Place"
          size="small"
          value={formValues.location}
          onChange={(e) => handleChange(e.target.value, "location")}
        />
      </div>
      <div className={styles["input-container"]}>
        <p>📆</p>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
          <DateTimePicker
            label="Starts at"
            value={new Date(formValues.start)}
            onChange={(value) => handleChange(value?.toISOString(), "start")}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles["input-container"]}>
        <p>📆</p>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ru}>
          <DateTimePicker
            label="Ends at"
            value={new Date(formValues.end)}
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
          onChange={(e) => handleChange(e.target.value, "description")}
        />
      </div>
      <div className={styles["checkbox-container"]}>
        <Checkbox
          value={formValues.allDay}
          onChange={(e) => handleChange(e.target.checked, "allDay")}
          inputProps={{ "aria-label": "controlled" }}
        />
        <div className={styles["checkbox-label"]}>is all day?</div>
      </div>

      <div className={styles["button-container"]}>
        <Button variant="contained" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="success" size="small" type="submit">
          Request
        </Button>
      </div>
    </form>
  );
};

export default RequestEventForm;
