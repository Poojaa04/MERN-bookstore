import React, { useContext, useEffect, useState } from "react";
import { itemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import "remixicon/fonts/remixicon.css";

const CartPage = () => {
	const { cartItems, totalPrice, updateQuantity } = useContext(itemContext);
	const navigate = useNavigate();
	const [slideOut, setSlideOut] = useState(false);
	const [targetPath, setTargetPath] = useState("");

	const handleNavigation = (path) => {
		setSlideOut(true);
		setTargetPath(path);
	};

	useEffect(() => {
		if (slideOut && targetPath) {
			const timer = setTimeout(() => {
				navigate(targetPath);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [slideOut, targetPath, navigate]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleQuantityChange = (id, quantity) => {
		if (quantity >= 1) {
			updateQuantity(id, quantity);
		}
	};

	return (
		<div className={`cart-page-wrapper ${slideOut ? "slide-out" : "slide-in"}`}>
			<div className="cart-page">
				<div className="cart-header-buttons">
					<h2>My Cart</h2>
					<button className="home-button" onClick={() => handleNavigation("/products")}>
						<i className="ri-close-large-line"></i>
					</button>
				</div>

				{cartItems.length === 0 ? (
					<div className="empty-cart">
						<div >
						<p>Cart’s bored. Fill it up!</p>
						<button
							className="bestsellers-button"
							onClick={() => handleNavigation("/products")}
						>
							Explore Best Sellers
						</button>
					</div>
						</div>
					
				) : (
					<>
						<div className="cart-items-list">
							{cartItems.map((item) => {
								console.log(item); 
								return (
									<div className="cart-item" key={item.id}>
										<img src={item.image} alt={item.title} className="cart-item-image" />
										<div className="cart-item-details">
											<h3>{item.title}</h3>
											<p>Price: ₹{item.price}</p>
											<div className="quantity-controls">
												<button className="removeButton"
													onClick={() =>
														handleQuantityChange(item.id, item.quantity - 1)
													}
												>
													-
												</button>
												<span> {item.quantity} </span>
												<button className="addButton"
													onClick={() =>
														handleQuantityChange(item.id, item.quantity + 1)
													}
												>
													+
												</button>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className="cart-summary">
							<h3>Total: ₹{totalPrice}</h3>
							<button
								className="checkout-button"
								onClick={() => handleNavigation("/checkout")}
							>
								Proceed to Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CartPage;
