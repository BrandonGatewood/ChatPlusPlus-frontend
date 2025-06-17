import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

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
        <div className={ styles['auth-container'] }>
            <form className={ styles['auth-box'] } onSubmit={ handleSubmit }>
                <h2>Login</h2>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    required
                    className={ styles['input'] }
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    required
                    className={ styles['input'] }
                />
                { message && (
                    <p style={{ color: message.type === "error" ? "red" : "green" }}>
                        { message.text }
                    </p>
                )}

                <div className={ styles['auth-links'] }>
                <a href="#">Forgot password?</a>
                </div>

                <button type="submit" className={ styles['btn-primary'] }>Login</button>

                <p className={ styles['toggle-text'] }>
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}