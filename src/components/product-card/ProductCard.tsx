import { Product } from "../section-deals/typings";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { addToCart } from "../../redux/cart-reducer";
import { addOrRemoveItem } from "../../redux/favourite-reducer";

function toFixed(num: number) {
	return num.toFixed(2);
}

const ProductCard = ({ attributes, id }: Product) => {
	const dispatch = useAppDispatch();

	const favouriteItems = useAppSelector((state) => state?.favourite?.products);

	const isFavourite = favouriteItems.find((item) => item.id === id);

	return (
		<div className='product_card'>
			<Link
				className='image_container'
				to={`/products/${attributes.slug}`}>
				<img
					src={attributes.images.data[0].attributes.url}
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
					<button
						onClick={() =>
							dispatch(
								addOrRemoveItem({
									id,
									name: attributes.name,
									imageUrl: attributes.images.data[0].attributes.url,
									price: attributes.price,
									description: attributes.description,
									slug: attributes.slug,
								}),
							)
						}>
						{isFavourite ? <IoMdHeart /> : <IoMdHeartEmpty />}
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
