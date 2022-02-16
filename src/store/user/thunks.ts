import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserThunk = createAsyncThunk("user/getUser", async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
});
