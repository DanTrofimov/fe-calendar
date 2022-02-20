import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  postRequestThunk,
  getRequestThunk,
  deleteRequestThunk,
  deleteAdminRequestThunk, postAdminRequestThunk, getAdminRequestThunk
} from "./thunks";
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
    builder.addCase(
      deleteRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request[]>) => {
        state.requests = action.payload;
      }
    )
    builder.addCase(
      getAdminRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request[]>) => {
        state.requests = action.payload;
      }
    );
    builder.addCase(
      postAdminRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request>) => {
        state.requests = state.requests?.filter((item) => item._id !== action.payload._id);
      }
    )
    builder.addCase(
      deleteAdminRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request>) => {
        state.requests = state.requests?.filter((item) => item._id !== action.payload._id);
      }
    )
  }
})

export const requestsReducer = requestSlice.reducer;
