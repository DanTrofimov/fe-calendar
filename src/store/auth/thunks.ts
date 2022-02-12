import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { History } from "history";
import { Routes } from "../../constants/routes";

type AuthInput = {
  email: string;
  password: string;
};

type AuthPayload = {
  authInput: AuthInput;
  history: History;
};

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (payload: AuthPayload) => {
    const { authInput, history } = payload;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign_up`, {
      method: "POST",
      body: JSON.stringify(authInput),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      history.push(Routes.LOGIN);
    }

    return data;
  }
);

export const loginThunk = createAsyncThunk(
  "auth/signIn",
  async (payload: AuthPayload) => {
    const { authInput, history } = payload;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign_in`, {
      method: "POST",
      body: JSON.stringify(authInput),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      history.push(Routes.DASHBOARD);
    }

    return data;
  }
);
