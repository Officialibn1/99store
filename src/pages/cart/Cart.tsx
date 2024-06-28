import React, { useState } from "react";
import "./Cart.scss";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { FaOpencart } from "react-icons/fa6";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import {
	decrementItemQuantity,
	incrementItemQuantity,
	removeFromCart,
	resetCart,
} from "../../redux/cart-reducer";

import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY)

import axios from "axios";
import EmptyCart from "../../components/ui/empty-cart/EmptyCart";
import { CgSpinner } from "react-icons/cg";

const Cart = () => {
	const items = useAppSelector((state) => state?.cart?.products);

	const dispath = useAppDispatch();

	const [checkoutLoading, setCheckoutLoading] = useState(false);

	const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

	const proceedCheckout = async () => {
		// console.log("Iytems", items);

		setCheckoutLoading(true);

		try {
			const stripe = await stripePromise;

			const res = await axios.post(
				`${import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL}/orders`,
				{
					products: items,
				},
				{
					headers: {
						Authorization: `Bearer ${
							import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
						}`,
					},
				},
			);

			console.log(res.data.stripeSession.id);

			await stripe.redirectToCheckout({
				sessionId: res.data.stripeSession.id,
			});
		} catch (error) {
			console.log(error);
		}

		setCheckoutLoading(false);
	};

	return (
		<Elements stripe={stripePromise}>
			<div className='section_container'>
				<div className='cart_page_container'>
					<div className='title'>
						<h1>Your Cart</h1>

						<FaOpencart />
					</div>

					<span></span>

					<div className='cart_main_wrapper'>
						<div className='cart_items_list'>
							{items.length > 0 ? (
								items.map((product) => (
									<div
										className='cart_item'
										key={product.name}>
										<div className='item_image'>
											<img
												src={product.imageUrl}
												alt={product.name}
											/>
										</div>

										<div className='item_details'>
											<h1>{product.name}</h1>

											<p>${product.price.toFixed(2)}</p>

											<div className='buttons'>
												<div className='quantity'>
													<button
														onClick={() =>
															dispath(decrementItemQuantity(product.id))
														}>
														<TiMinusOutline />
													</button>
													<span>{product.quantity}</span>
													<button
														onClick={() =>
															dispath(incrementItemQuantity(product.id))
														}>
														<TiPlusOutline />
													</button>
												</div>

												<button
													onClick={() => dispath(removeFromCart(product.id))}>
													Remove
												</button>
											</div>
										</div>
									</div>
								))
							) : (
								<EmptyCart />
							)}
						</div>

						<div className='cart_checkout_details'>
							<h1>Cart Summary</h1>

							<span></span>

							<div className='sub_total'>
								<p>Subtotal: </p>{" "}
								<p>
									$
									{items
										.reduce((num, item) => item.price * item.quantity + num, 0)
										.toFixed(2)}
								</p>
							</div>

							<div className='checkout'>
								<button
									disabled={items.length < 1 || checkoutLoading}
									onClick={proceedCheckout}
									aria-disabled={items.length < 1 || checkoutLoading}>
									{!checkoutLoading ? "Checkout" : <CgSpinner />}
								</button>

								<button
									disabled={items.length < 1 || checkoutLoading}
									onClick={() => dispath(resetCart())}
									aria-disabled={items.length < 1 || checkoutLoading}>
									Clear Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Elements>
	);
};

export default Cart;
