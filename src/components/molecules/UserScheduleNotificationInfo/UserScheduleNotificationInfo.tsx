import React, { FC, useCallback, useMemo } from "react";
import { Button } from "@mui/material";
import { format } from "date-fns";
import styles from "../AdminRequestEventInfo/styles.module.css";
import { Scheduled } from "../../../domain";

type UserScheduleNotificationInfoProps = {
  eventData: Scheduled;
  setIsRequestOpen: (arg0: boolean) => void;
  onReject: (id: string) => void;
};

const UserScheduleNotificationInfo: FC<UserScheduleNotificationInfoProps> = ({
  eventData,
  setIsRequestOpen,
  onReject
}) => {
  const { _id, start, end, summary, date } = eventData;

  const handleCloseModal = useCallback(() => {
    setIsRequestOpen(false);
  }, [setIsRequestOpen]);

  const handleReject = useCallback(() => {
    onReject(_id as string);
  }, [_id, onReject]);

  const dateFormat = "LLL d hh:mm b";

  const range = `${format(new Date(start), dateFormat)} - ${format(
    new Date(end),
    dateFormat
  )}`;

  const isoDate = useMemo(() => new Date(date), [date]);
  const formattedDate = useMemo(
    () =>
      `${isoDate.getDate()}/${isoDate.getMonth() + 1}/${isoDate.getFullYear()}`,
    [isoDate]
  );
  const formattedTime = useMemo(
    () => `${isoDate.getHours()}:${isoDate.getMinutes()}`,
    [isoDate]
  );
  return (
    <>
      <h2>{summary}</h2>
      <p>📆 {range}</p>
      <p>
        Пришлём письмо {formattedDate} в {formattedTime}
      </p>
      <div className={styles["button-container"]}>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleReject}
        >
          Delete Notification
        </Button>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default UserScheduleNotificationInfo;
