import React, { FC } from "react";
import { Scheduled, Request } from "../../../domain";
import styles from "./styles.module.css";
import ItemList from "../../atoms/ItemList";

type EventListProps = {
  list: Scheduled[] | Request[];
  buttonTitle: string;
  isAdminItem?: boolean;
  handleDeleteRequest: (id: string) => void;
  handleApproveRequest?: (id: string) => void;
};

const EventList: FC<EventListProps> = ({
  list,
  buttonTitle,
  handleDeleteRequest,
  handleApproveRequest,
  isAdminItem,
}) => (
  <div className={styles["calendar-container"]}>
    {list.map((item) => (
      <ItemList
        key={item._id}
        buttonTitle={buttonTitle}
        eventData={item}
        handleApproveRequest={handleApproveRequest}
        handleDeleteRequest={handleDeleteRequest}
        isAdminItem={isAdminItem}
      />
    ))}
  </div>
);

export default EventList;
