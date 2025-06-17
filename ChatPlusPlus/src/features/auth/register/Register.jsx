import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

export default function Register() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ message, setMessage ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        // Replace with real api call
        setMessage({ type: "success", text: "Registration successful!" });
    };

    return (
        <div className={ styles['auth-container'] }>
            <form className={ styles['auth-box'] } onSubmit={ handleSubmit }>
                <h2>Register</h2>
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
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    value={ confirmPassword }
                    onChange={ (e) => setPassword(e.target.value) }
                    required
                    className={ styles['input'] }
                />
                <button type="submit" className={ styles['btn-primary'] }>Register</button>

                <p className={ styles['toggle-text'] }>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}