import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppColor } from "@src/types";
import { DEFAULT_APP_COLOR } from "@src/util";

export type GlobalsState = {
  appColor: AppColor;
};

const initialState: GlobalsState = {
  appColor: DEFAULT_APP_COLOR,
};

export const globalsSlice = createSlice({
  name: "globalsSlice",
  initialState,
  reducers: {
    setAppColor(state, { payload }: PayloadAction<AppColor>) {
      state.appColor = payload;
    },
  },
});

export const { setAppColor } = globalsSlice.actions;
export const { reducer: globals } = globalsSlice;
