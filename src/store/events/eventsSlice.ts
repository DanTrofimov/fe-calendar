import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../domain";
import { getEventsThunk } from "./thunks";

export type EventsState = {
  events: Event[];
};

const initialEventsState: EventsState = {
  events: []
};

const eventsSlice = createSlice({
  initialState: initialEventsState,
  reducers: {},
  name: "events",
  extraReducers: (builder) => {
    builder.addCase(
      getEventsThunk.fulfilled,
      (state: EventsState, action: PayloadAction<Event[]>) => {
        state.events = action.payload;
      }
    );
  }
});

export const eventsReducer = eventsSlice.reducer;
