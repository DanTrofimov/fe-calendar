import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type AuthInput = {
  email: string;
  password: string;
};

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (authInput: AuthInput) => {
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
    }

    return data;
  }
);

export const loginThunk = createAsyncThunk(
  "auth/signIn",
  async (authInput: AuthInput) => {
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
    }
    
    return data;
  }
);
