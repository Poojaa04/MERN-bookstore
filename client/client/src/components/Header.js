import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { itemContext } from "../context/ItemContext";
import { Link, useNavigate } from "react-router-dom";
import CartPage from "./CartPage";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
	const { itemsInCart, totalPrice } = useContext(itemContext);
	const { isLoggedIn, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [showCart, setShowCart] = useState(false);

	const handleLogout = () => {
		logout();
		alert("Logged out successfully");
		navigate("/login");
	};

	const toggleCart = () => {
		setShowCart(!showCart);
	};

	return (
		<div className="container">
			<div className="header">
				<h1 className="gfg">Book Store</h1>

				<nav style={{ display: "flex", gap: "1rem" }}>
					{isLoggedIn ? (
						<>
							<Link to="/products" className="navButton">Products</Link>
							<button onClick={handleLogout} className="navButton">Logout</button>
						</>
					) : (
						<>
							<Link to="/login" className="navButton">Login</Link>
							<Link to="/signup" className="navButton">Signup</Link>
						</>
					)}
				</nav>

				<div className="cart" onClick={toggleCart} style={{ cursor: "pointer" }}>
					<h3 style={{ color: "black" }}>Total Price: {totalPrice}</h3>
					<div className="cart-num">
						<div className="cart-items">{itemsInCart}</div>
						<FontAwesomeIcon icon={faCartShopping} size="3x" />
					</div>
				</div>
			</div>

			{showCart && <CartPage />}
		</div>
	);
};

export default Header;
