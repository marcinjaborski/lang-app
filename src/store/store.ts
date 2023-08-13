import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createModuleDialog, createStudyDialog, feedback, noteDrawer, noteEditor } from "@src/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  createModuleDialog,
  noteDrawer,
  noteEditor,
  feedback,
  createStudyDialog,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gdM) => gdM({ serializableCheck: { ignoredActions: ["noteDrawerSlice/updateStateFromNote"] } }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
