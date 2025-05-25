import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import './App.css';
import CustomItemContext from './context/ItemContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './components/CartPage';


const App = () => {
	return (
		<CustomItemContext>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
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

				</Routes>
			</Router>
		</CustomItemContext>
	);
};

export default App;

