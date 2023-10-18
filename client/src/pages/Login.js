import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3005/auth/login", {
                username,
                password,
            });
    
            if (response.data.userID !== undefined) {
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                window.localStorage.setItem("username", username);
                navigate("/");
            } else {
                alert("The user name or password is incorrect. Try again.");
            }
        } catch (error) {
            console.error(error);
        }
    };
  
    return (
        <div className = "center">
            <h1>Login</h1>
            <form onSubmit = { handleSubmit }>
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
                        value = { password }
                        onChange = { (event) => setPassword(event.target.value) }
                    />
                    <span></span>
                    <label>Password</label>
                </div>
                <button type="submit">Login</button>
                <div className="signup">
                    Don't have an account yet? <a href="register">Sign-up!</a>
                </div>
            </form>
        </div>
    );
};
