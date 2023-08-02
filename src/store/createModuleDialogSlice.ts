import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CreateModuleDialogType = "create" | "update";

export type CreateModuleDialogState = {
  open: boolean;
  name: string;
  type: CreateModuleDialogType;
  moduleId: string | null;
};

const initialState: CreateModuleDialogState = {
  open: false,
  name: "",
  type: "create",
  moduleId: null,
};

const createModuleDialogSlice = createSlice({
  name: "createModuleDialogSlice",
  initialState,
  reducers: {
    openDialog(state, { payload }: PayloadAction<{ type: CreateModuleDialogType; moduleId?: string }>) {
      state.open = true;
      state.type = payload.type;
      state.moduleId = payload.moduleId ?? null;
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
export const { reducer: createModuleDialog } = createModuleDialogSlice;
