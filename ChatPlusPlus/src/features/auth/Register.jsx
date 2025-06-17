import { useState } from "react";

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
        <form onSubmit={ handleSubmit } style={{ maxWidth: 300, margin: "auto" }}>
            <h2>Register</h2>
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
            <input 
                type="password" 
                placeholder="Confirm Password"
                value={ confirmPassword }
                onChange={ (e) => setPassword(e.target.value) }
                required
                style={{ width: "100%", marginBottom: 10, padding: 8 }}
            />
            <button type="sumbit" style={{ width: "100%", padding: 8 }}>
                Register 
            </button>
        </form>
    )
}