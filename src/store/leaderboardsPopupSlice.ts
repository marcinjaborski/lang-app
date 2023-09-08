import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LeaderboardsPopupState = {
  open: boolean;
  studySetSharedId: string | null;
};

const initialState: LeaderboardsPopupState = {
  open: false,
  studySetSharedId: null,
};

export const leaderboardsSlice = createSlice({
  name: "leaderboardsSlice",
  initialState,
  reducers: {
    setLeaderboardsStudySetId(state, { payload }: PayloadAction<string | null>) {
      state.open = typeof payload === "string";
      state.studySetSharedId = payload;
    },
  },
});

export const { setLeaderboardsStudySetId } = leaderboardsSlice.actions;
export const { reducer: leaderboardsPopup } = leaderboardsSlice;
