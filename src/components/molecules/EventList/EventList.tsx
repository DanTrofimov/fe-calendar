import React, { FC } from "react";
import { Scheduled, Request } from "../../../domain";
import styles from "./styles.module.css";
import ItemList from "../../atoms/ItemList";

type EventListProps = {
  list: Scheduled[] | Request[];
  buttonTitle: string;
  isNeedModal?: boolean;
  handleButtonClick?: (id: string) => void;
  handleDeleteRequest?: (id: string) => void;
  handleApproveRequest?: (id: string) => void;
};

const EventList: FC<EventListProps> = ({
  list,
  buttonTitle,
  handleButtonClick,
  handleDeleteRequest,
  handleApproveRequest,
  isNeedModal
}) => (
  <div className={styles["calendar-container"]}>
    {list.map((item) => (
      <ItemList
        key={item._id}
        buttonTitle={buttonTitle}
        handleButtonClick={handleButtonClick}
        eventData={item}
        handleApproveRequest={handleApproveRequest}
        handleDeleteRequest={handleDeleteRequest}
        isNeedModal={isNeedModal}
      />
    ))}
  </div>
);

export default EventList;
