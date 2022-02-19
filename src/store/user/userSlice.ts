import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../domain";
import {getUserThunk} from "./thunks";

export type UserState = {
  user: User | null;
};

type UserResponse = {
  role: string;
  _id: string;
  email: string;
};

const initialUserState: UserState = {
  user: null
};

const userSlice = createSlice({
  initialState: initialUserState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  name: "user",
  extraReducers: (builder) => {
    builder.addCase(
      getUserThunk.fulfilled,
      (state: UserState, action: PayloadAction<UserResponse>) => {
        state.user = {
          ...action.payload,
        };
      }
    );
  }
});

export const {clearUser} = userSlice.actions;
export const userReducer = userSlice.reducer;