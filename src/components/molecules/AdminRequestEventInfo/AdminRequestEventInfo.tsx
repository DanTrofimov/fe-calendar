import React, { FC, useMemo, useCallback } from "react";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { Request, Scheduled } from "../../../domain";
import styles from "./styles.module.css";

type AdminRequestEventInfoProps = {
  eventData: Request | Scheduled;
  onReject: (id: string) => void;
  onApprove?: (id: string) => void;
  setIsRequestOpen: (arg0: boolean) => void;
};

const AdminRequestEventInfo: FC<AdminRequestEventInfoProps> = ({
  eventData,
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

  const range = useMemo(
    () =>
      `${format(new Date(start), dateFormat)} - ${format(
        new Date(end),
        dateFormat
      )}`,
    [start, end]
  );

  const handleAccept = useCallback(() => {
    if (onApprove) {
      onApprove(id as string);
    }
    setIsRequestOpen(false);
  }, [id, onApprove, setIsRequestOpen]);

  const handleReject = useCallback(() => {
    onReject(id as string);
    setIsRequestOpen(false);
  }, [id, onReject, setIsRequestOpen]);

  return (
    <>
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
    </>
  );
};

export default AdminRequestEventInfo;
