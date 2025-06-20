// src/context/ItemContext.js

import { createContext, useEffect, useState } from "react";

const itemContext = createContext();

function CustomItemContext({ children }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [itemsInCart, setItemsInCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books`);
            const products = await response.json();
			console.log(products);
			setProducts(products);
		};

		fetchData();
	}, []);

	const addToCart = (product) => {
		const existingItem = cart.find(item => item._id === product._id);
		if (existingItem) {
			const updatedCart = cart.map(item =>
				item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
			);
			setCart(updatedCart);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
		setItemsInCart(prev => prev + 1);
		setTotalPrice(prev => prev + product.price);
	};

	const removeFromCart = (product) => {
		const existingItem = cart.find(item => item._id === product._id);
		if (!existingItem) return;

		if (existingItem.quantity === 1) {
			const updatedCart = cart.filter(item => item._id !== product._id);
			setCart(updatedCart);
		} else {
			const updatedCart = cart.map(item =>
				item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
			);
			setCart(updatedCart);
		}
		setItemsInCart(prev => Math.max(prev - 1, 0));
		setTotalPrice(prev => Math.max(prev - product.price, 0));
	};

	const updateQuantity = (id, newQty) => {
		if (newQty < 1) return;

		const item = cart.find(item => item._id === id);
		if (!item) return;

		const oldQty = item.quantity;
		const updatedCart = cart.map(item =>
			item._id === id ? { ...item, quantity: newQty } : item
		);
		setCart(updatedCart);

		const quantityDiff = newQty - oldQty;
		setItemsInCart(prev => prev + quantityDiff);
		setTotalPrice(prev => prev + quantityDiff * item.price);
	};

	return (
		<itemContext.Provider
			value={{
				products,
				addToCart,
				removeFromCart,
				updateQuantity,
				itemsInCart,
				totalPrice,
				cartItems: cart, // ✅ Exposed for CartPage.js
			}}
		>
			{children}
		</itemContext.Provider>
	);
}

export { itemContext };
export default CustomItemContext;
