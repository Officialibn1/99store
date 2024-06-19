import React from "react";
import "./EmptyCart.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const EmptyCart = () => {
	return (
		<div className='empty_cart_container'>
			<div>
				<Player
					autoplay
					loop
					src='/EmptyCart.json'
				/>
			</div>

			<h1>Sorry, you have no item in your cart!!</h1>

			<h2>
				<Link to={"/"}>Continue</Link> shopping to add items
			</h2>
		</div>
	);
};

export default EmptyCart;
