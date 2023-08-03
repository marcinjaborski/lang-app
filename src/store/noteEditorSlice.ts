import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NoteEditorState = {
  title: string;
  createDialogOpen: boolean;
};

const initialState: NoteEditorState = {
  title: "",
  createDialogOpen: false,
};

const noteEditorSlice = createSlice({
  name: "noteEditorSlice",
  initialState,
  reducers: {
    changeTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
    openCreateTermDialog(state) {
      state.createDialogOpen = true;
    },
    closeCreateTermDialog(state) {
      state.createDialogOpen = false;
    },
  },
});

export const { changeTitle, openCreateTermDialog, closeCreateTermDialog } = noteEditorSlice.actions;
export const { reducer: noteEditor } = noteEditorSlice;
