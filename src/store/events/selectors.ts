import { createSelector } from "reselect";
import { RootState } from "..";
import { Event } from "../../domain";
import { EventsState } from "./eventsSlice";

export const selectEventsState = (state: RootState): EventsState =>
  state.events;

export const selectEvents = createSelector(
  selectEventsState,
  (state: EventsState): Event[] => state.events
);

export const selectLoading = createSelector(
  selectEventsState,
  (state: EventsState): boolean => state.isLoading
);
