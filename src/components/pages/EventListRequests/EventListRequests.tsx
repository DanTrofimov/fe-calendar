import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "../../molecules/Header";
import styles from "../Dashboard/styles.module.css";
import {getAdminRequestThunk, getRequestThunk} from "../../../store/requests/thunks";
import {selectRequests} from "../../../store/requests/selectors";
import {Request, Roles, User} from "../../../domain";
import {Routes} from "../../../constants/routes";
import {selectUser} from "../../../store/user/selectors";

const EventListRequests: FC = () => {
  const dispatch = useDispatch();
  const user: User | null = useSelector(selectUser);

  useEffect(() => {
    if (user?.role === Roles.ADMIN) {
      dispatch(getAdminRequestThunk());
    } else {
      dispatch(getRequestThunk())
    }
  }, [dispatch, user?.role]);

  const requests: Request[] | null = useSelector(selectRequests);

  console.log(requests);
  return (
    <div className={styles["calendar-container"]}>
      <Header buttonTitle="Dashboard" buttonRouter={Routes.DASHBOARD}/>
      <div className={styles.content}>
        <h1>Requested events</h1>
      </div>
    </div>
  );
};

export default EventListRequests;
