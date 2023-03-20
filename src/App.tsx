import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import pb from "./util/pocketbase";
import NotFound from "./pages/NotFound/NotFound";
import NotePage from "./pages/NotePage/NotePage";

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
