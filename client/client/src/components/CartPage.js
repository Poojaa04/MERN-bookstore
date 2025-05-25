import React, { useContext, useEffect, useState } from "react";
import { itemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
	const { cartItems, totalPrice, updateQuantity } = useContext(itemContext);
	const navigate = useNavigate();
	const [slideOut, setSlideOut] = useState(false);

	const handleGoHome = () => {
		setSlideOut(true);
		setTimeout(() => {
			navigate("/products");
		}, 300); // Match this with the CSS animation duration
	};


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={`cart-page-wrapper ${slideOut ? "slide-out" : "slide-in"}`}>
			<div className="cart-page">
				<h2>My Cart</h2>
				<div className="cart-header-buttons">
					<button className="home-button" onClick={handleGoHome}>
						Go to Home
					</button>
				</div>

				{cartItems.length === 0 ? (
					<div className="empty-cart">
						<p>Cart’s bored. Fill it up.</p>
						<button className="bestsellers-button" onClick={handleGoHome}>
							Explore Best Sellers
						</button>
					</div>
				) : (
					<>
						<div className="cart-items-list">
							{cartItems.map((item) => (
								<div className="cart-item" key={item.id}>
									<img src={item.image} alt={item.name} className="cart-item-image" />
									<div className="cart-item-details">
										<h3>{item.name}</h3>
										<p>Price: ₹{item.price}</p>
										<div className="quantity-controls">
											<button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
											<span>{item.quantity}</span>
											<button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="cart-summary">
							<h3>Total: ₹{totalPrice}</h3>
							<button className="checkout-button" onClick={() => navigate("/checkout")}>
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
