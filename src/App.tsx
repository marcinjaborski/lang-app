import { FeedbackSnackbar, Navbar } from "@src/components";
import { useSettings } from "@src/hooks";
import { FlashcardsPage, Home, Login, NotePage, NotFound, QuizPage, Settings, StudyingSetGrid } from "@src/pages";
import { setLastAccessedNote, useAppDispatch } from "@src/store";
import { pb } from "@src/util";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  const { i18n } = useTranslation();
  const isLogged = pb.authStore.isValid;
  const appLang = useSettings()?.language;
  const dispatch = useAppDispatch();

  useEffect(() => {
    i18n.changeLanguage(appLang).then();
  }, [appLang]);

  useEffect(() => {
    const lastAccessedNote = localStorage.getItem("lastAccessedNote");
    if (lastAccessedNote) dispatch(setLastAccessedNote(lastAccessedNote));
  }, []);

  return (
    <>
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
            <Route element={<Settings />} path="/settings" />
          </>
        ) : null}
        <Route element={<NotFound />} path="*" />
      </Routes>
      <FeedbackSnackbar />
    </>
  );
};
