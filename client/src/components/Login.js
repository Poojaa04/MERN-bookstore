import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { login } = useContext(AuthContext); // ✅ Correctly using AuthContext

	const handleLogin = async () => {
		try {
			const res = await axios.post("/api/auth/login", {
				email,
				password,
			});

			if (res.data.token) {
				login(res.data.token); // ✅ Use context login method
				alert("Login successful");
				navigate("/products"); // ✅ Redirect after login
			} else {
				alert("Invalid response from server");
			}
		} catch (err) {
			console.error("Login error:", err.response?.data || err.message);
			alert("Login failed: " + (err.response?.data?.message || "Server error"));
		}
	};

	return (
		<div className="loginBody"> 
			<div className="login">
				<h2>Login</h2>
				<input
					id="loginEmail"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					id="loginPassword"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
};

export default Login;