import { createSelector } from "reselect";
import { RootState } from "..";
import { AuthState } from "./authSlice";

export const selectAuthState = (state: RootState): AuthState => state.auth;

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState): string => state.error
);

export const selectAuthMessage = createSelector(
  selectAuthState,
  (state: AuthState): string => state.message
);
