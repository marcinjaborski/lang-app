import { ThemeProvider } from "@mui/material";
import { FeedbackSnackbar, Navbar } from "@src/components";
import { useSettings } from "@src/hooks";
import {
  FlashcardsPage,
  Home,
  Login,
  MatchGamePage,
  NotePage,
  NotFound,
  ProfilePage,
  QuizPage,
  Settings,
  StudyingSetGrid,
} from "@src/pages";
import { setAppColor, setLastAccessedNote, useAppDispatch, useAppSelector } from "@src/store";
import { AppColor, isAppColor } from "@src/types";
import { inputGlobalStyles, LOCAL_STORAGE, pb, themes } from "@src/util";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  const { i18n } = useTranslation();
  const isLogged = pb.authStore.isValid;
  const appLang = useSettings()?.language;
  const dispatch = useAppDispatch();
  const appColor = useAppSelector((state) => state.globals.appColor);

  useEffect(() => {
    i18n.changeLanguage(appLang).then();
  }, [appLang]);

  useEffect(() => {
    const lastAccessedNote = localStorage.getItem("lastAccessedNote");
    if (lastAccessedNote) dispatch(setLastAccessedNote(lastAccessedNote));
  }, []);

  useEffect(() => {
    const appColor = localStorage.getItem(LOCAL_STORAGE.APP_COLOR);
    if (isAppColor(appColor)) dispatch(setAppColor(appColor as AppColor));
  }, []);

  return (
    <ThemeProvider theme={themes[appColor]}>
      {inputGlobalStyles}
      <Navbar />
      <Routes>
        <Route element={isLogged ? <Home /> : <Login />} path="/" />
        <Route element={<Login />} path="/login" />
        {isLogged ? (
          <>
            <Route element={<NotePage />} path="/note/:id" />
            <Route element={<StudyingSetGrid />} path="/study" />
            <Route element={<FlashcardsPage />} path="/flashcards/:id" />
            <Route element={<QuizPage />} path="/quiz/:id" />
            <Route element={<MatchGamePage />} path="/matchGame/:id" />
            <Route element={<ProfilePage />} path="/profile" />
            <Route element={<Settings />} path="/settings" />
          </>
        ) : null}
        <Route element={<NotFound />} path="*" />
      </Routes>
      <FeedbackSnackbar />
    </ThemeProvider>
  );
};
