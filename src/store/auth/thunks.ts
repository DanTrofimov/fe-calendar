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
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    const data = response.json();
    return data;
  }
);
