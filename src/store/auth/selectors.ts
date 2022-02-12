import { RootState } from "..";
import { AuthState } from "./authSlice";

export const selectAuthState = (state: RootState): AuthState => state.auth;
