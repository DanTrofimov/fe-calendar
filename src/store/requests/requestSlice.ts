import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postRequestThunk, getRequestThunk } from "./thunks";
import { Request } from "../../domain";

export type RequestsState = {
  requests: Request[];
};

const initialRequestsState: RequestsState = {
  requests: []
}

const requestSlice = createSlice({
  initialState: initialRequestsState,
  reducers: {},
  name: 'requests',
  extraReducers: (builder) => {
    builder.addCase(
      getRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request[]>) => {
        state.requests = action.payload;
      }
    );
    builder.addCase(
      postRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request[]>) => {
        state.requests = action.payload;
      }
    )
  }
})

export const requestsReducer = requestSlice.reducer;
