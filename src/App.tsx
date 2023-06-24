import { Navbar } from "@src/components";
import { FeedbackSnackbar } from "@src/components/FeedbackSnackbar/FeedbackSnackbar";
import { Home, Login, NotePage, NotFound } from "@src/pages";
import { pb } from "@src/util";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  const isLogged = pb.authStore.isValid;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isLogged ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        {isLogged ? (
          <>
            <Route path="/note" element={<NotePage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FeedbackSnackbar />
    </>
  );
};
