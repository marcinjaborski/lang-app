import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OpenContextPayload = {
  contextTermId: string;
  contextPosition: {
    top: number;
    left: number;
  };
};

type NoteEditorState = {
  title: string;
  createDialogOpen: boolean;
  updateDialogOpen: boolean;
  contextMenuOpen: boolean;
  contextTermId: string;
  contextPosition: {
    top: number;
    left: number;
  };
  termDialogBase: string;
  termDialogTranslation: string;
  lastAccessedNote: string | null;
};

const initialState: NoteEditorState = {
  title: "",
  createDialogOpen: false,
  updateDialogOpen: false,
  contextMenuOpen: false,
  contextTermId: "",
  contextPosition: {
    top: -10000,
    left: -10000,
  },
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
    openUpdateTermDialog(state) {
      state.updateDialogOpen = true;
    },
    closeCreateTermDialog(state) {
      state.createDialogOpen = false;
      state.updateDialogOpen = false;
    },
    openContextMenu(state, { payload }: PayloadAction<OpenContextPayload>) {
      state.contextMenuOpen = true;
      state.contextTermId = payload.contextTermId;
      state.contextPosition = payload.contextPosition;
    },
    closeContextMenu(state) {
      state.contextMenuOpen = false;
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
  openUpdateTermDialog,
  closeCreateTermDialog,
  openContextMenu,
  closeContextMenu,
  setTermDialogTranslation,
  setTermDialogBase,
  setLastAccessedNote,
} = noteEditorSlice.actions;
export const { reducer: noteEditor } = noteEditorSlice;
