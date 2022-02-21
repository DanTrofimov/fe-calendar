import React, { FC, useState } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import AdminRequestEventInfo from "../../molecules/AdminRequestEventInfo";
import ModalComponent from "../../molecules/ModalComponent";
import { Request, Scheduled } from "../../../domain";
import UserScheduleNotificationInfo from "../../molecules/UserScheduleNotificationInfo";

type ItemListProps = {
  eventData: Request | Scheduled;
  buttonTitle: string;
  isAdminItem?: boolean;
  handleButtonClick?: (id: string) => void;
  handleDeleteRequest?: (id: string) => void;
  handleApproveRequest?: (id: string) => void;
};

const ItemList: FC<ItemListProps> = ({
  eventData,
  buttonTitle,
  handleButtonClick,
  handleDeleteRequest,
  handleApproveRequest,
  isAdminItem,
}) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const { summary } = eventData;

  const handleClick = () => {
    setIsRequestOpen(true);
  };

  return (
    <div className={styles.item}>
      <p>{summary}</p>
      <Button variant="contained" size="small" onClick={handleClick}>
        {buttonTitle}
      </Button>
      <ModalComponent
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      >
        {isAdminItem ? (
          <AdminRequestEventInfo
            onApprove={handleApproveRequest}
            onReject={handleDeleteRequest}
            eventData={eventData}
            setIsRequestOpen={setIsRequestOpen}
          />
        ) : (
          <UserScheduleNotificationInfo
            onReject={handleDeleteRequest}
            eventData={eventData}
            setIsRequestOpen={setIsRequestOpen}
          />
        )}
      </ModalComponent>
    </div>
  );
};

export default ItemList;
