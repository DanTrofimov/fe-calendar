import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Roles, User } from "../../domain";
import { getUserThunk } from "./thunks";

export type UserState = {
  user: User | null;
};

type UserResponse = {
  id: string;
  email: string;
};

const initialUserState: UserState = {
  user: null
};

const userSlice = createSlice({
  initialState: initialUserState,
  reducers: {},
  name: "user",
  extraReducers: (builder) => {
    builder.addCase(
      getUserThunk.fulfilled,
      (state: UserState, action: PayloadAction<UserResponse>) => {
        state.user = {
          ...action.payload,
          role: Roles.USER
        };
      }
    );
  }
});

export const userReducer = userSlice.reducer;
