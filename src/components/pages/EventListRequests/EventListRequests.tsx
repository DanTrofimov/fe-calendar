import React, {FC, useEffect} from "react";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";

const EventListRequests: FC = () => {

  useEffect(() => {
    console.log('s')
  })

  return (
    <div className={styles["calendar-container"]}>
      <Header/>
      <h1>Requested events</h1>
    </div>)}

export default EventListRequests;
