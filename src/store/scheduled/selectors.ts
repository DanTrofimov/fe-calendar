import { createSelector } from "reselect";
import { RootState } from "..";
import { Scheduled } from "../../domain";
import { ScheduledState } from "./scheduledSlice";

export const selectScheduledState = (state: RootState): ScheduledState =>
  state.scheduled;

export const selectScheduled = createSelector(
  selectScheduledState,
  (state: ScheduledState): Scheduled[] | undefined => state.scheduled
);
