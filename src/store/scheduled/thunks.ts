import { createAsyncThunk } from "@reduxjs/toolkit";

export const getScheduledThunk = createAsyncThunk('request/getScheduled', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/notification`, {
    headers: {
      "Content-type": "application/json"
    }
  })

  const data = await response.json();
  return data;
})

type Notification = {
  uid: string;
  _id: string;
  date: string;
}

export const createScheduledThunk = createAsyncThunk('request/postScheduled', async (notification: Notification) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/notification`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(notification)
  })

  const data = await response.json();
  return data;
})
