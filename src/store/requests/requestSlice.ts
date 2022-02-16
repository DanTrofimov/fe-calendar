import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createRequestThunk, getRequestThunk} from "./thunks";
import {Request} from "../../domain";

type RequestsState = {
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
      createRequestThunk.fulfilled,
      (state: RequestsState, action: PayloadAction<Request[]>) => {
        state.requests = action.payload;
      }
    )
  }
})

export const requestsReducer = requestSlice;
