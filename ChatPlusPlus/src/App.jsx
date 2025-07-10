import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./features/auth/RequireAuth";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ChatPage from "./pages/chat/ChatPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={ <LoginPage /> }></Route>
                <Route path="/register" element={ <RegisterPage /> }></Route>
                <Route path="/chats" element={ 
                    <RequireAuth>
                        <ChatPage /> 
                    </RequireAuth>
                }/>
                <Route path="*" element={ <Navigate to="/login" replace /> }></Route>
            </Routes>
        </Router>
    );
}

export default App
