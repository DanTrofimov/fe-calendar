import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createScheduledThunk, getScheduledThunk} from "./thunks";
import { Scheduled} from "../../domain";

type ScheduledState = {
  scheduled: Scheduled[] | null;
};

const initialScheduleState: ScheduledState = {
  scheduled: [],
}

const scheduledSlice = createSlice({
  initialState: initialScheduleState,
  reducers: {},
  name: 'scheduled',
  extraReducers: (builder) => {
    builder.addCase(
      getScheduledThunk.fulfilled,
      (state: ScheduledState, action: PayloadAction<Scheduled[]>) => {
        state.scheduled = action.payload;
      }
    );
    builder.addCase(
      createScheduledThunk.fulfilled,
      (state: ScheduledState, action: PayloadAction<Scheduled[]>) => {
        state.scheduled = action.payload;
      }
    )
  }
})

export const scheduledReducer = scheduledSlice;
