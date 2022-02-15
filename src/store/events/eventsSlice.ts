import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../domain";
import { getEventsThunk } from "./thunks";

export type EventsState = {
  events: Event[];
  isLoading: boolean,
};

const initialEventsState: EventsState = {
  events: [],
  isLoading: false,
};

const eventsSlice = createSlice({
  initialState: initialEventsState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
  name: "events",
  extraReducers: (builder) => {
    builder.addCase(
      getEventsThunk.fulfilled,
      (state: EventsState, action: PayloadAction<Event[]>) => {
        state.events = action.payload;
        state.isLoading = false;
      }
    );
  }
});

export const { setLoading } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
