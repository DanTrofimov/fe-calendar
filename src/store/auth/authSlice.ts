import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpThunk } from "./thunks";

export type AuthState = {
  isLogged: boolean;
  message: string;
};

const initialAuthState: AuthState = {
  isLogged: false,
  message: ""
};

const authSlice = createSlice({
  initialState: initialAuthState,
  reducers: {
    login() {},
    logout() {}
  },
  name: "auth",
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action: PayloadAction) => {
      console.log(state, action);
    });
  }
});

export const authReducer = authSlice.reducer;
