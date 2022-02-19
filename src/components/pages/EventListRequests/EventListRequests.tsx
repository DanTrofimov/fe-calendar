import React, {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import {
  deleteAdminRequestThunk,
  deleteRequestThunk,
  getAdminRequestThunk,
  getRequestThunk, postAdminRequestThunk
} from "../../../store/requests/thunks";
import {selectRequests} from "../../../store/requests/selectors";
import {Request, Roles, User} from "../../../domain";
import {Routes} from "../../../constants/routes";
import {selectUser} from "../../../store/user/selectors";
import {useAppDispatch} from "../../../store";
import EventList from "../../molecules/EventList";
import RequestEventForm from "../../molecules/RequestEventForm";
import ModalComponent from "../../molecules/ModalComponent";

const EventListRequests: FC = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    if (user?.role === Roles.ADMIN) {
      dispatch(getAdminRequestThunk());
    } else {
      dispatch(getRequestThunk())
    }
  }, [dispatch, user?.role]);

  const handleDeleteRequest = async (id: string) => {
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
  }

  const handleApproveRequest = async (id: string) => {
    const data = await dispatch(postAdminRequestThunk(id)).unwrap();

    if (!data.error) {
      toast.success("Request cancelled");
    } else {
      toast.error("Request cancelled error");
    }
  }

  const handleButtonClick = () => {
    setIsRequestOpen(true);
  }

  const requests: Request[] | null = useSelector(selectRequests);

  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" buttonRouter={Routes.DASHBOARD}/>
      <div className={styles.content}>
        <h1>Requested events</h1>
        {requests?.length
          ? (<EventList list={requests} buttonTitle='More'
                        handleButtonClick={handleButtonClick}/>)
          : (<p>Уведомлений не создано или они были выполнены</p>)
        }
        <ModalComponent
          isOpen={isRequestOpen}
          onClose={() => setIsRequestOpen(false)}
        >
          <RequestEventForm
            onApprove={handleApproveRequest}
            onReject={handleDeleteRequest}
            onCancel={() => setIsRequestOpen(false)}
          />
        </ModalComponent>
      </div>
    </div>
  );
};

export default EventListRequests;
