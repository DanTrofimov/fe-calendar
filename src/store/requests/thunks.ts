import { createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "../../domain";

export const getRequestThunk = createAsyncThunk('request/getRequest', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/request`, {
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    }
  })

  const data = await response.json();
  return data;
})

export const postRequestThunk = createAsyncThunk(
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

export const deleteRequestThunk = createAsyncThunk('request/deleteScheduled', async (request: Event) => {
  const id = request.uid || request._id;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/request/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    },
  })

  const data = await response.json();
  return data;
})

export const getAdminRequestThunk = createAsyncThunk('request/getAdminRequest', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/requests`, {
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    }
  })

  const data = await response.json();
  return data;
})

export const postAdminRequestThunk = createAsyncThunk(
  "request/postAdminRequest",
  async (request: Event) => {
    const id = request.uid || request._id;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/requests/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return data;
  }
);

export const deleteAdminRequestThunk = createAsyncThunk('request/deleteAdminScheduled', async (request: Event) => {
  const id = request.uid || request._id;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/request/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    },
  })

  const data = await response.json();
  return data;
})
