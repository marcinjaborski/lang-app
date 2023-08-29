import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, Note, SerializableUser } from "@src/types";
import { DEFAULT_LANG, DEFAULT_TRANSLATION_LANG } from "@src/util";

export type NoteDrawerState = {
  open: boolean;
  baseLang: Language;
  targetLang: Language;
  module: string;
  excerpt: string;
  shared: SerializableUser[];
};

const initialState: NoteDrawerState = {
  open: false,
  baseLang: DEFAULT_LANG,
  targetLang: DEFAULT_TRANSLATION_LANG,
  module: "",
  excerpt: "",
  shared: [],
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
    addToShared(state, { payload }: PayloadAction<SerializableUser>) {
      state.shared = [...state.shared, payload];
    },
    removeFromShared(state, { payload }: PayloadAction<SerializableUser>) {
      state.shared = state.shared.filter((user) => user.id !== payload.id);
    },
    updateStateFromNote(state, { payload }: PayloadAction<Note>) {
      if (payload.baseLang) {
        state.baseLang = payload.baseLang;
      }
      if (payload.targetLang) {
        state.targetLang = payload.targetLang;
      }
      state.module = payload.module;
      state.excerpt = payload.excerpt;
      state.shared = payload.expand.shared?.map(({ id, username }) => ({ id, username })) || [];
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
  addToShared,
  removeFromShared,
  clearState,
} = noteDrawerSlice.actions;
export const { reducer: noteDrawer } = noteDrawerSlice;
