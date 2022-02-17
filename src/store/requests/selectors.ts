import { createSelector } from "reselect";
import { RootState } from "..";
import { Request } from "../../domain";
import { RequestsState } from "./requestSlice";

export const selectRequestsState = (state: RootState): RequestsState =>
  state.requests;

export const selectRequests = createSelector(
  selectRequestsState,
  (state: RequestsState): Request[] | null => state.requests
);
