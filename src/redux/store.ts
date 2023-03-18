import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createModuleDialogReducer from "./createModuleDialogSlice";
import noteDrawerReducer from "./noteDrawerSlice";

const store = configureStore({
  reducer: combineReducers({
    createModuleDialog: createModuleDialogReducer,
    noteDrawer: noteDrawerReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
