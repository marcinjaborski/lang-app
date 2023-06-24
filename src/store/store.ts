import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createModuleDialog, feedback, noteDrawer, noteEditor } from "@src/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: combineReducers({
    createModuleDialog,
    noteDrawer,
    noteEditor,
    feedback,
  }),
  middleware: (gdM) => gdM({ serializableCheck: { ignoredActions: ["noteDrawerSlice/updateStateFromNote"] } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
