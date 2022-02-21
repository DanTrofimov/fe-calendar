import React, { FC, useState } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import RequestEventForm from "../../molecules/RequestEventForm";
import ModalComponent from "../../molecules/ModalComponent";
import { Request, Scheduled } from "../../../domain";

type ItemListProps = {
  eventData: Request | Scheduled;
  buttonTitle: string;
  isNeedModal?: boolean;
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
  isNeedModal
}) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const {
    summary,
    date,
    end,
    start,
    description,
    location,
    allDay,
    _id: id
  } = eventData;

  const handleClick = () => {
    if (handleButtonClick) {
      handleButtonClick(id as string);
    }
    if (isNeedModal) {
      setIsRequestOpen(true);
    }
  };

  const isoDate = new Date(date);
  const formattedDate = `${isoDate.getDate()}/${
    isoDate.getMonth() + 1
  }/${isoDate.getFullYear()}`;
  const isDateValid = () => !Number.isNaN(isoDate.getTime());

  return (
    <div className={styles.item}>
      <p>{summary}</p>
      {isDateValid() && <span>{formattedDate}</span>}
      <Button variant="contained" size="small" onClick={handleClick}>
        {buttonTitle}
      </Button>
      <ModalComponent
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
      >
        <RequestEventForm
          onApprove={handleApproveRequest}
          onReject={handleDeleteRequest}
          onCancel={() => setIsRequestOpen(false)}
          summary={summary}
          location={location}
          start={start}
          end={end}
          description={description}
          allDay={allDay}
          readOnly
          id={id}
          setIsRequestOpen={setIsRequestOpen}
        />
      </ModalComponent>
    </div>
  );
};

export default ItemList;
