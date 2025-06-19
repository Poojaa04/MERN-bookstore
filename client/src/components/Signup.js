import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/api/auth/signup", {
				email,
				password,
			});
			alert("Signup successful! Please login.");
			navigate("/login");
		} catch (err) {
			console.error(err);
			alert("Signup failed. " + (err.response?.data?.message || ""));
		}
	};

	return (
		<div className="signupBody">
			<form className="signup" onSubmit={handleSignup}>
				<h2>Signup</h2>
				<input
				type="text"
				placeholder="Enter your Full Name"
				value={username}
				onChange={(e)=>setUsername(e.target.value)}
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Signup</button>
			</form>
		</div>
	);
};

export default Signup;
