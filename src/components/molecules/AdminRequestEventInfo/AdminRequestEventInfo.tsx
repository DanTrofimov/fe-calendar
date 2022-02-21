import React, { FC } from "react";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { Request, Scheduled } from "../../../domain";
import styles from "./styles.module.css";

type AdminRequestEventInfoProps = {
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

const AdminRequestEventInfo: FC<AdminRequestEventInfoProps> = ({
  eventData,
  onSubmit,
  onCancel,
  onApprove,
  onReject,
  setIsRequestOpen
}) => {
  const {
    summary,
    location,
    start,
    end,
    description,
    allDay,
    _id: id
  } = eventData;

  const dateFormat = "LLL d hh:mm b";

  const range = `${format(new Date(start), dateFormat)} - ${format(
    new Date(end),
    dateFormat
  )}`;

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
    <div>
      <h2>{summary}</h2>
      <p>📍 {location}</p>
      <p>📆 {range}</p>
      <p>Весь день: {allDay ? "✔️" : "❌"}</p>
      <p>
        🔗{" "}
        <a href={description} target="_blank" rel="noreferrer">
          Подробнее о событии тут
        </a>
      </p>
      <div className={styles["button-container"]}>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleReject}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleAccept}
        >
          Approve
        </Button>
      </div>
    </div>
  );
};

export default AdminRequestEventInfo;
