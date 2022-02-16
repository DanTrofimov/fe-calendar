import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authReducer } from "./auth/authSlice";
import { userReducer } from "./user/userSlice";
import { eventsReducer } from "./events/eventsSlice";
import { requestsReducer } from "./requests/requestSlice";
import { scheduledReducer } from "./scheduled/scheduledSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    events: eventsReducer,
    request: requestsReducer,
    scheduled: scheduledReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
