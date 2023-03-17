import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CreateModuleDialogState = {
  open: boolean;
  name: string;
};

const initialState: CreateModuleDialogState = {
  open: false,
  name: "",
};

const createModuleDialogSlice = createSlice({
  name: "createModuleDialogSlice",
  initialState,
  reducers: {
    openDialog(state) {
      state.open = true;
    },
    closeDialog(state) {
      state.open = false;
      state.name = "";
    },
    changeNameValue(state, { payload }: PayloadAction<string>) {
      state.name = payload;
    },
  },
});

export const { openDialog, closeDialog, changeNameValue } = createModuleDialogSlice.actions;
export default createModuleDialogSlice.reducer;
