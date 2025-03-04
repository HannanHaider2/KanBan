import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TokenProvider, TokenContext } from "./context/tokenContext";
import Home from "./Pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoggerPage from "./Pages/LoggerPage";
import { useContext } from "react";

function App() {
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/log" element={<LoggerPage />} />
          <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(TokenContext);
  return token ? children : <Navigate to="/login" />;
}

export default App;
