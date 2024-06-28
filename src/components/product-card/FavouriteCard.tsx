import React from "react";
import "./ProductCard.scss";
import { FavouriteItem, addOrRemoveItem } from "../../redux/favourite-reducer";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { addToCart } from "../../redux/cart-reducer";
import { HiOutlineShoppingCart } from "react-icons/hi2";

function toFixed(num: number) {
	return num.toFixed(2);
}

const FavouriteCard = ({ product }: { product: FavouriteItem }) => {
	const dispatch = useAppDispatch();

	const favouriteItems = useAppSelector((state) => state?.favourite?.products);

	const isFavourite = favouriteItems.find((item) => item.id === product.id);

	return (
		<div className='product_card'>
			<Link
				className='image_container'
				to={`/products/${product.slug}`}>
				<img
					src={product.imageUrl}
					alt={product.slug}
				/>
			</Link>

			<div className='product_details'>
				<h1>{product.name}</h1>

				<div>
					<p>${toFixed(product.price + product.price / 8)}</p>
					<p>${product.price}</p>
				</div>

				<div className='product_card_buttons'>
					<button
						onClick={() =>
							dispatch(
								addOrRemoveItem({
									id: product.id,
									name: product.name,
									imageUrl: product.imageUrl,
									price: product.price,
									description: product.description,
									slug: product.slug,
								}),
							)
						}>
						{isFavourite ? <IoMdHeart /> : <IoMdHeartEmpty />}
					</button>

					<button
						onClick={() =>
							dispatch(
								addToCart({
									id: product.id,
									name: product.name,
									imageUrl: product.imageUrl,
									price: product.price,
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

export default FavouriteCard;
