import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NoteEditorState = {
  title: string;
  createDialogOpen: boolean;
  termDialogBase: string;
  termDialogTranslation: string;
  lastAccessedNote: string | null;
};

const initialState: NoteEditorState = {
  title: "",
  createDialogOpen: false,
  termDialogBase: "",
  termDialogTranslation: "",
  lastAccessedNote: null,
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
    setTermDialogBase(state, { payload }: PayloadAction<string>) {
      state.termDialogBase = payload;
    },
    setTermDialogTranslation(state, { payload }: PayloadAction<string>) {
      state.termDialogTranslation = payload;
    },
    setLastAccessedNote(state, { payload }: PayloadAction<string>) {
      state.lastAccessedNote = payload;
    },
  },
});

export const {
  changeTitle,
  openCreateTermDialog,
  closeCreateTermDialog,
  setTermDialogTranslation,
  setTermDialogBase,
  setLastAccessedNote,
} = noteEditorSlice.actions;
export const { reducer: noteEditor } = noteEditorSlice;
