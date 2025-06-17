import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ message, setMessage ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace with real api call
        if(email === "test@gmail.com" && password === "password")
            setMessage({ type: "success", text: "Login successful!" });
        else
            setMessage({ type: "error", text: "Invalid credentials." });
    };

    return(
        <form onSubmit={ handleSubmit }>
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                required
                style={{ width: "100%", marginBottom: 10, padding: 8 }}
            />
            <input 
                type="password" 
                placeholder="Password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                required
                style={{ width: "100%", marginBottom: 10, padding: 8 }}
            />
            { message && (
                <p style={{ color: message.type === "error" ? "red" : "green" }}>
                    { message.text }
                </p>
            )}

            <p style={{ fontSize: 14 }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "blue" }}>
                    Register
                </Link>
            </p>
            <button type="sumbit" style={{ width: "100%", padding: 8 }}>
                Login
            </button>
        </form>
    );
}