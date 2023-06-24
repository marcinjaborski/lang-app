import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FeedbackState = {
  message: string;
  severity: AlertColor;
};

const initialState: FeedbackState = {
  message: "",
  severity: "success",
};

export const feedbackSlice = createSlice({
  name: "feedbackSlice",
  initialState,
  reducers: {
    showSuccess(state, { payload }: PayloadAction<string>) {
      state.message = payload;
      state.severity = "success";
    },
    showError(state, { payload }: PayloadAction<string>) {
      state.message = payload;
      state.severity = "error";
    },
    closeSnackbar(state) {
      state.message = "";
    },
  },
});

export const { showSuccess, showError, closeSnackbar } = feedbackSlice.actions;
export const { reducer: feedback } = feedbackSlice;
