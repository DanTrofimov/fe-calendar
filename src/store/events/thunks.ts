import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEventsThunk = createAsyncThunk(
  "events/getEvents",
  async (year: string = new Date().getFullYear().toString()) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/events?year=${year}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();
    return data;
  }
);
