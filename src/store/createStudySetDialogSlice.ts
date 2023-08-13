import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createStudySetFrom = {
  all: "all",
  module: "module",
  note: "note",
} as const;

export type CreateStudySetFrom = (typeof createStudySetFrom)[keyof typeof createStudySetFrom];

export type CreateStudySetDialogState = {
  open: boolean;
  title: string;
  from: CreateStudySetFrom;
  fromId: string;
  includeTags: string[];
  excludeTags: string[];
};

const initialState: CreateStudySetDialogState = {
  open: false,
  title: "",
  from: "all",
  fromId: "",
  includeTags: [],
  excludeTags: [],
};

const createStudySetDialogSlice = createSlice({
  name: "createStudySetDialogSlice",
  initialState,
  reducers: {
    openStudyDialog(state) {
      state.open = true;
    },
    closeStudyDialog() {
      return initialState;
    },
    setTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
    setFrom(state, { payload }: PayloadAction<CreateStudySetFrom>) {
      state.from = payload;
    },
    setFromId(state, { payload }: PayloadAction<string>) {
      state.fromId = payload;
    },
    setIncludeTags(state, { payload }: PayloadAction<string[]>) {
      state.includeTags = payload;
    },
    setExcludeTags(state, { payload }: PayloadAction<string[]>) {
      state.excludeTags = payload;
    },
  },
});

export const { openStudyDialog, closeStudyDialog, setTitle, setFrom, setFromId, setIncludeTags, setExcludeTags } =
  createStudySetDialogSlice.actions;
export const { reducer: createStudyDialog } = createStudySetDialogSlice;
