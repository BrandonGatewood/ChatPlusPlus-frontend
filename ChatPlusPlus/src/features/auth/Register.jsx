import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./AuthForm.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setMessage({ type: "success", text: "Registration successful!" });
  };

  return (
    <div className={styles["auth-container"]}>
      <form className={styles["auth-box"]} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles["input"]}
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

        <div className={styles["password-wrapper"]}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles["input"]}
          />
          <button
            type="button"
            className={styles["toggle-password"]}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className={styles["btn-primary"]}>
          Register
        </button>

        <p className={styles["toggle-text"]}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}