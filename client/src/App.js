import React from 'react';
import { useContext, useEffect } from "react";
import { Routes, Route,useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import './App.css';
import CustomItemContext from './context/ItemContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './components/CartPage';
import { AuthContext } from "./context/AuthContext";



const App = () => {

	const { isLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (isLoggedIn && location.pathname === "/") {
			navigate("/products");
		}
	}, [isLoggedIn, location, navigate]);

	return (
		<CustomItemContext>
			<Header />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/products"
					element={
						<ProtectedRoute>
							<ProductList />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/cart"
					element={
						<ProtectedRoute>
							<CartPage />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<div />} /> {/* Prevent blank screen before redirect */}
			</Routes>
		</CustomItemContext>
	);
};
export default App;

