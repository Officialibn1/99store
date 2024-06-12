import React from "react";
import { Product } from "../section-deals/typings";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useAppDispatch } from "../../redux/redux-hooks";
import { addToCart } from "../../redux/cart-reducer";

function toFixed(num: number) {
	return num.toFixed(2);
}

const ProductCard = ({ attributes, id }: Product) => {
	const dispatch = useAppDispatch();

	return (
		<div className='product_card'>
			<Link
				className='image_container'
				to={`/products/${attributes.slug}`}>
				<img
					src={`${import.meta.env.VITE_STRAPI_SERVER_IMAGE_URL}${
						attributes.images.data[0].attributes.url
					}`}
					alt={attributes.images.data[0].attributes.hash}
				/>
			</Link>

			<div className='product_details'>
				<h1>{attributes.name}</h1>

				<div>
					<p>${toFixed(attributes.price + attributes.price / 8)}</p>
					<p>${attributes.price}</p>
				</div>

				<div className='product_card_buttons'>
					<button>
						<IoMdHeartEmpty />
					</button>

					<button
						onClick={() =>
							dispatch(
								addToCart({
									id,
									name: attributes.name,
									imageUrl: attributes.images.data[0].attributes.url,
									price: attributes.price,
									quantity: 1,
								}),
							)
						}>
						<span>Add to Cart</span>
						<HiOutlineShoppingCart />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
