import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./AuthForm.module.css";
import api from "../../api/axios";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [ message, setMessage ] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/login", {
                email,
                password,
            });

            localStorage.setItem("access_token", resizeBy.data.access_token);
            alert("Login successful!");
        }
        catch(err)
        {
            alert("Invalid credentials.");
            console.error(err);
        }
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

                <div className={styles["password-wrapper"]}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles["input"]}
                    />
                    <button
                    type="button"
                    className={styles["toggle-password"]}
                    onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

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