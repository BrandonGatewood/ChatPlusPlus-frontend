import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ChatPage from "./pages/chat/ChatPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route
                    path="/chats"
                    element={
                        <RequireAuth>
                            <ChatPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/chats/:chat_id"
                    element={
                        <RequireAuth>
                            <ChatPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                ></Route>
            </Routes>
            <ToastContainer position="top-center" autoClose={3000} />
        </Router>
    );
}

export default App;
