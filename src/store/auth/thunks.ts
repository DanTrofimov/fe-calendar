import { createAsyncThunk } from "@reduxjs/toolkit";

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
    return data;
  }
);

export const loginThunk = createAsyncThunk(
  "auth/signIn",
  async (authInput: AuthInput) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sign_in`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authInput)
    });
    const data = await response.json();

    return data;
  }
);

export const logoutThunk = createAsyncThunk("auth/signOut", async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/sign_out`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  return data;
});
