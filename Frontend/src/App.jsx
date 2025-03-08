import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TokenProvider, TokenContext } from "./context/tokenContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoggerPage from "./Pages/LoggerPage";
import { useContext } from "react";

function App() {
  const { token } = useContext(TokenContext);

  return (
    <Router>
      <Routes>
        {/* Redirect the root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/app" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/log" element={<LoggerPage />} />
        <Route path="/app" element={token ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
