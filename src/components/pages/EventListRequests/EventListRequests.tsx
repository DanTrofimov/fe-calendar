import React, { FC, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import {
  deleteAdminRequestThunk,
  deleteRequestThunk,
  getAdminRequestThunk,
  getRequestThunk,
  postAdminRequestThunk
} from "../../../store/requests/thunks";
import { selectRequests } from "../../../store/requests/selectors";
import { Request, Roles, User } from "../../../domain";
import { Routes } from "../../../constants/routes";
import { selectUser } from "../../../store/user/selectors";
import { useAppDispatch } from "../../../store";
import EventList from "../../molecules/EventList";

const EventListRequests: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    if (user?.role === Roles.ADMIN) {
      dispatch(getAdminRequestThunk());
    } else {
      dispatch(getRequestThunk());
    }
  }, [dispatch, user?.role]);

  const handleDeleteRequest = useCallback(
    async (id: string) => {
      let data;
      if (user?.role === Roles.ADMIN) {
        data = await dispatch(deleteAdminRequestThunk(id)).unwrap();
      } else {
        data = await dispatch(deleteRequestThunk(id)).unwrap();
      }
      if (!data.error) {
        toast.success("Request cancelled");
      } else {
        toast.error("Request cancelled error");
      }
    },
    [dispatch, user?.role]
  );

  const handleApproveRequest = useCallback(
    async (id: string) => {
      const data = await dispatch(postAdminRequestThunk(id)).unwrap();

      if (!data.error) {
        toast.success("Request cancelled");
      } else {
        toast.error("Request cancelled error");
      }
    },
    [dispatch]
  );

  const requests: Request[] | null = useSelector(selectRequests);

  const onButtonRoute = useCallback(
    () => history.push(Routes.DASHBOARD),
    [history]
  );

  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" onButtonRoute={onButtonRoute} />
      <div className={styles.content}>
        <h1>Requested events</h1>
        {requests?.length ? (
          <EventList
            list={requests}
            buttonTitle="More"
            handleDeleteRequest={handleDeleteRequest}
            handleApproveRequest={handleApproveRequest}
            isAdminItem
          />
        ) : (
          <p>Запросов на добавление событий нет</p>
        )}
      </div>
    </div>
  );
};

export default EventListRequests;
