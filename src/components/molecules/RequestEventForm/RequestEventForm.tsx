import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./styles.module.css";

type RequetsEventFormProps = {
  onSubmit: (id: string, uid: string, scheduledDate: string) => void;
  onCancel: () => void;
};

const RequestEventForm: FC<RequetsEventFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const dateFormat = "LLL d hh:mm b";

  const onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h2>Event request</h2>
      <p>📍</p>
      <p>📆</p>
      <p>🔗</p>
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
