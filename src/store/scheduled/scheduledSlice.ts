import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postScheduledThunk, getScheduledThunk, deleteScheduledThunk } from "./thunks";
import { Scheduled} from "../../domain";

export type ScheduledState = {
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
      postScheduledThunk.fulfilled,
      (state: ScheduledState, action: PayloadAction<Scheduled[]>) => {
        state.scheduled = action.payload;
      }
    )
    builder.addCase(
      deleteScheduledThunk.fulfilled,
      (state: ScheduledState, action: PayloadAction<Scheduled[]>) => {
        state.scheduled = action.payload;
      }
    )
  }
})

export const scheduledReducer = scheduledSlice.reducer;
