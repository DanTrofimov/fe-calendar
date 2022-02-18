import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Event } from "../../../domain";

type SceduleEventFormProps = {
  event: Event;
  onSubmit: () => void;
  onCancel: () => void;
};

const SceduleEventForm: FC<SceduleEventFormProps> = ({
  event,
  onSubmit,
  onCancel
}) => {
  const [scheduleDate, setScheduleDate] = useState("");

  const {
    start: startDate,
    end: endDate,
    summary: title,
    description,
    location
  } = event;

  return (
    <form>
      <h2>{title}</h2>
      <p>📍 {location}</p>
      <p>
        📆 {startDate} - {endDate}
      </p>
      <p>🔗 {description}</p>
      <div>
        <TextField
          id="datetime-local"
          label="Notify at"
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      <div>
        <Button>Cancel</Button>
        <Button>Schedule</Button>
      </div>
    </form>
  );
};

export default SceduleEventForm;
