import { createSelector } from "reselect";
import { RootState } from "..";
import { User } from "../../domain";
import { UserState } from "./userSlice";

export const selectUserState = (state: RootState): UserState => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState): User | null => state.user
);
