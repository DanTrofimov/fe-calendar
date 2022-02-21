import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, signUpThunk, logoutThunk } from "./thunks";

export type AuthState = {
  error: string;
  message: string;
};

export type Response = {
  error: string;
  message: string;
  statusCode: number;
};

const initialAuthState: AuthState = {
  error: "",
  message: ""
};

const authSlice = createSlice({
  initialState: initialAuthState,
  reducers: {
    cleanInfo(state) {
      state.error = "";
      state.message = "";
    }
  },
  name: "auth",
  extraReducers: (builder) => {
    builder.addCase(
      loginThunk.fulfilled,
      (state: AuthState, action: PayloadAction<Response>) => {
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.message = action.payload.message;
        }
      }
    );
    builder.addCase(
      signUpThunk.fulfilled,
      (state: AuthState, action: PayloadAction<Response>) => {
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.message = action.payload.message;
        }
      }
    );
    builder.addCase(
      logoutThunk.fulfilled,
      (state: AuthState, action: PayloadAction<Response>) => {
        if (!action.payload.error) {
          state.message = "";
          state.error = "";
        }
      }
    );
  }
});

export const { cleanInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;
