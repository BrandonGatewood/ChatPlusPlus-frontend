import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./AuthForm.module.css";
import api from "../../api/axios";

export default function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [ message, setMessage ] = useState(null);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (message) setMessage(null); 
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true); 

        try {
            const res = await api.post("/login", form);
            localStorage.setItem("access_token", res.data.access_token);
            setForm({ email: "", password: "" });
            navigate("/chats");
        } catch (err) {
            console.error(err);
            const message = err?.response?.data?.detail || "An unexpected error occurred.";
            setMessage({ type: "error", text: message });
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={ styles['auth-container'] }>
            <form className={ styles['auth-box'] } onSubmit={ handleSubmit }>
                <h2>Login</h2>

                <input 
                    autoFocus
                    name="email"
                    type="email" 
                    autoComplete="email"
                    placeholder="Email"
                    value={ form.email }
                    onChange={handleChange}
                    required
                    className={ styles['input'] }
                />

                <div className={styles["password-wrapper"]}>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className={styles["input"]}
                    />
                    <button
                        type="button"
                        className={styles["toggle-password"]}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
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
                    <a 
                        type="button"
                        href="#">Forgot password?
                    </a>
                </div>

                <button type="submit" className={ styles['btn-primary'] } disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className={ styles['toggle-text'] }>
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}