import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpThunk } from "./thunks";

export type AuthState = {
  isLogged: boolean;
};

export type Response = {
  error: string,
  message: string,
  statusCode: number,
}

const initialAuthState: AuthState = {
  isLogged: false
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
      
    });
  }
});

export const authReducer = authSlice.reducer;
