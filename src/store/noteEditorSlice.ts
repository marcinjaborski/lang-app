import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NoteEditorState = {
  title: string;
};

const initialState: NoteEditorState = {
  title: "",
};

const noteEditorSlice = createSlice({
  name: "noteEditorSlice",
  initialState,
  reducers: {
    changeTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
  },
});

export const { changeTitle } = noteEditorSlice.actions;
export const { reducer: noteEditor } = noteEditorSlice;
