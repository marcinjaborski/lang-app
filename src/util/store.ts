import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createModuleDialogReducer from "../components/CreateModuleDialog/createModuleDialogSlice";
import noteDrawerReducer from "../components/NoteDrawer/noteDrawerSlice";
import noteEditorReducer from "../components/NoteEditor/noteEditorSlice";

const store = configureStore({
  reducer: combineReducers({
    createModuleDialog: createModuleDialogReducer,
    noteDrawer: noteDrawerReducer,
    noteEditor: noteEditorReducer,
  }),
  middleware: (gdM) => gdM({ serializableCheck: { ignoredActions: ["noteDrawerSlice/updateStateFromNote"] } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
