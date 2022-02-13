import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk("user/getUser", async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },
    credentials: "include"
  });
  const data = await response.json();
  return data;
});
