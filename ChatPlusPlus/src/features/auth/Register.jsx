import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./AuthForm.module.css";
import api from "../../api/axios";

export default function Register() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (message) setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        if (form.password !== form.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            setLoading(false);
            return;
        }
  
        try {
            const res = await api.post("/register", {
                email: form.email,
                password: form.password,
            });

            localStorage.setItem("access_token", res.data.access_token);
            setForm({ email: "", password: "", confirmPassword: "" });

            navigate("/chats");
        }
        catch (err) {
            const msg = err?.response?.data?.detail || err.message || "Unexpected error";
            setMessage({ type: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles["auth-container"]}>
            <form className={styles["auth-box"]} onSubmit={handleSubmit}>
                <h2>Register</h2>

                <input
                    autoFocus
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={styles["input"]}
                />

                <div className={styles["password-wrapper"]}>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
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

                <div className={styles["password-wrapper"]}>
                    <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className={styles["input"]}
                        
                    />
                    <button
                        type="button"
                        className={styles["toggle-password"]}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                { message && (
                    <p style={{ color: message.type === "error" ? "red" : "green" }}>
                        { message.text }
                    </p>
                )}

                <button type="submit" className={styles["btn-primary"]}  disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className={styles["toggle-text"]}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}