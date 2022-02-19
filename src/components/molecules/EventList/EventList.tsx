import React, {FC} from "react";
import {Scheduled, Request} from "../../../domain";
import styles from "./styles.module.css";
import ItemList from '../../atoms/ItemList'

type EventListProps = {
  list: Scheduled[] | Request[];
  buttonTitle: string;
  handleButtonClick: (id: string) => void;
}

const EventList: FC<EventListProps> = ({list, buttonTitle, handleButtonClick}) => (
    <div className={styles["calendar-container"]}>
      {list.map((item) => (
        <ItemList key={item._id} summary={item.summary} date={item.date}
                  buttonTitle={buttonTitle} handleButtonClick={handleButtonClick} id={item._id}/>
      ))}
    </div>)

export default EventList;
