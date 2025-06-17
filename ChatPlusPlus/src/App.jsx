import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <LoginPage /> }></Route>
        <Route path="/register" element={ <RegisterPage /> }></Route>
        <Route path="*" element={ <Navigate to="/login" replace /> }></Route>
      </Routes>
    </Router>
  );
}

export default App
