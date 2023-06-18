import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "@src/@types";
import { Language } from "@src/util";

export type NoteDrawerState = {
  open: boolean;
  baseLang: Language;
  targetLang: Language;
  module: string;
  excerpt: string;
};

const initialState: NoteDrawerState = {
  open: false,
  baseLang: "gb",
  targetLang: "es",
  module: "",
  excerpt: "",
};

const noteDrawerSlice = createSlice({
  name: "noteDrawerSlice",
  initialState,
  reducers: {
    openDrawer(state) {
      state.open = true;
    },
    closeDrawer(state) {
      state.open = false;
    },
    changeBaseLang(state, { payload }: PayloadAction<Language>) {
      state.baseLang = payload;
    },
    changeTargetLang(state, { payload }: PayloadAction<Language>) {
      state.targetLang = payload;
    },
    changeModule(state, { payload }: PayloadAction<string>) {
      state.module = payload;
    },
    changeExcerpt(state, { payload }: PayloadAction<string>) {
      state.excerpt = payload;
    },
    updateStateFromNote(state, { payload }: PayloadAction<Note>) {
      state.baseLang = payload.baseLang;
      state.targetLang = payload.targetLang;
      state.module = payload.module;
      state.excerpt = payload.excerpt;
    },
    clearState() {
      return initialState;
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  changeBaseLang,
  changeTargetLang,
  changeModule,
  changeExcerpt,
  updateStateFromNote,
  clearState,
} = noteDrawerSlice.actions;
export const { reducer: noteDrawer } = noteDrawerSlice;
