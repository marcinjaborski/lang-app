import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../util/types";

export type noteDrawerState = {
  open: boolean;
  baseLang: Language;
  targetLang: Language;
  module: string;
  excerpt: string;
};

const initialState: noteDrawerState = {
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
  },
});

export const { openDrawer, closeDrawer, changeBaseLang, changeTargetLang, changeModule, changeExcerpt } =
  noteDrawerSlice.actions;
export default noteDrawerSlice.reducer;
