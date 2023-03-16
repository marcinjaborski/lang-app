import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import pb from "./util/pocketbase";
import NotFound from "./pages/NotFound";

const App = () => {
  const isLogged = pb.authStore.isValid;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isLogged ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
