import { createAsyncThunk } from "@reduxjs/toolkit";
import {Event} from "../../domain";

export const getRequestThunk = createAsyncThunk('request/getRequest', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/request`, {
    headers: {
      "Content-type": "application/json"
    }
  })

  const data = await response.json();
  return data;
})

export const createRequestThunk = createAsyncThunk(
  "request/postRequest",
  async (request: Event) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data = await response.json();

    return data;
  }
);
