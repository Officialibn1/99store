import React from "react";
import "./Favourites.scss";
import { useAppSelector } from "../../redux/redux-hooks";
import FavouriteCard from "../../components/product-card/FavouriteCard";
import EmptyCart from "../../components/ui/empty-cart/EmptyCart";
import { IoMdHeart } from "react-icons/io";

const Favourites = () => {
	const products = useAppSelector((state) => state?.favourite?.products);

	return (
		<div className='section_container'>
			<div className='favourite_page_container'>
				<div className='title'>
					<h1>Your Favourite Products ( {products?.length} )</h1>

					<IoMdHeart />
				</div>

				<span></span>

				{products.length > 0 ? (
					<div className='grid_container favourite_products'>
						{products.map((product) => (
							<FavouriteCard product={product} />
						))}
					</div>
				) : (
					<EmptyCart title='Sorry, you have no item in your favourite list!!' />
				)}
			</div>
		</div>
	);
};

export default Favourites;
