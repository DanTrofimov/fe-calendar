import React, {FC, useEffect} from "react";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import EventList from '../../molecules/EventList/EventList'

const EventListScheduled: FC = () => {

  useEffect(() => {
    console.log('s')
  })

  return (
    <div className={styles["calendar-container"]}>
      <Header/>
      <h1>Scheduled Events</h1>
    </div>)}

export default EventListScheduled;
