import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import { getRequestThunk } from "../../../store/requests/thunks";
import { selectRequests } from "../../../store/requests/selectors";
import { Request } from "../../../domain";
import { Routes } from "../../../constants/routes";

const EventListRequests: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestThunk());
  }, [dispatch]);

  const requests: Request[] | null = useSelector(selectRequests);

  // console.log(requests);
  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" buttonRouter={Routes.DASHBOARD} />
      <div className={styles.content}>
        <h1>Requested events</h1>
      </div>
    </div>
  );
};

export default EventListRequests;
