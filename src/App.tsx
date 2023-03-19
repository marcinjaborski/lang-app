import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import pb from "./util/pocketbase";
import NotFound from "./pages/NotFound";
import NotePage from "./pages/NotePage";

const App = () => {
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
    </>
  );
};

export default App;
