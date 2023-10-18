import React, { useState } from "react";
import axios from "axios";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("User Registration Successful! Please Login.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className = "center">
            <form onSubmit = { handleSubmit }>
                <h1>Register</h1>
                <div className = "txt_field">
                    <input
                        type = "text" required
                        id = "username"
                        value = { username }
                        onChange = { (event) => setUsername(event.target.value) }
                    />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className = "txt_field">
                    <input
                        type = "password" required
                        id = "password"
                        value = {password}
                        onChange = { (event) => setPassword(event.target.value) }
                    />
                    <span></span>
                    <label>Password</label>
                </div>
                <button type = "submit">Register</button>
                <div className="signup">
                    Already have an account? <a href="login">Sign-in!</a>
                </div>
            </form>
        </div>
    );
};
