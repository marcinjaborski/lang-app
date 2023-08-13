import { FeedbackSnackbar, Navbar } from "@src/components";
import { useSettings } from "@src/hooks";
import { FlashcardsPage, Home, Login, NotePage, NotFound, Settings, StudyingSetGrid } from "@src/pages";
import { pb } from "@src/util";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  const { i18n } = useTranslation();
  const isLogged = pb.authStore.isValid;
  const appLang = useSettings()?.language;

  useEffect(() => {
    i18n.changeLanguage(appLang).then();
  }, [appLang]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isLogged ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        {isLogged ? (
          <>
            <Route path="/note/:id" element={<NotePage />} />
            <Route path="/study" element={<StudyingSetGrid />} />
            <Route path="/flashcards/:id" element={<FlashcardsPage />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FeedbackSnackbar />
    </>
  );
};
