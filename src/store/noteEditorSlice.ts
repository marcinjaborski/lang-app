import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TermPhase = "writing" | "translating" | null;

type NoteEditorState = {
  title: string;
  termPhase: TermPhase;
};

const initialState: NoteEditorState = {
  title: "",
  termPhase: null,
};

const noteEditorSlice = createSlice({
  name: "noteEditorSlice",
  initialState,
  reducers: {
    changeTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
    startWritingTerm(state) {
      state.termPhase = "writing";
    },
    moveToNextStep(state) {
      state.termPhase = state.termPhase === "writing" ? "translating" : null;
    },
  },
});

export const { changeTitle, startWritingTerm, moveToNextStep } = noteEditorSlice.actions;
export const { reducer: noteEditor } = noteEditorSlice;
