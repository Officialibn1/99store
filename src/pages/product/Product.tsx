import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.scss";
import {
	type ProductResponse,
	type Product,
} from "../../components/section-deals/typings";
import { FaTruckFast } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { IoMdStarOutline } from "react-icons/io";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import { CartItem, addToCart } from "../../redux/cart-reducer";
import { useAppDispatch } from "../../redux/redux-hooks";

const Product = () => {
	const [productData, setProductData] = useState<Product>();

	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState();

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const [productQuantity, setProductQuantity] = useState(1);

	const params = useParams();

	const dispatch = useAppDispatch();

	useEffect(() => {
		setIsLoading(true);
		const fetchProduct = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/Products?populate=*&[filters][slug]=${params.id}`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				const data: ProductResponse = await res.data;

				if (res.status === 200) {
					setProductData(data.data[0]);
					setIsLoading(false);
					return;
				}
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
				return;
			}
		};

		fetchProduct();
	}, []);

	const addProduct = ({ id, name, imageUrl, quantity, price }: CartItem) => {
		dispatch(addToCart({ id, name, imageUrl, quantity, price }));

		setProductQuantity(1);
	};

	return (
		<div className='section_container'>
			<div className='product_page_container'>
				{isLoading && <h1>Fetching Product Information. . .</h1>}

				{!isLoading && error && (
					<h1>
						Error while Fetching Product Information, please refresh page. . .
					</h1>
				)}

				{!isLoading && !error && productData && (
					<div className='product_image_information'>
						<div className='product_images_container'>
							<div className='product_image_large'>
								<img
									src={`${import.meta.env.VITE_STRAPI_SERVER_IMAGE_URL}${
										productData?.attributes.images.data[currentImageIndex]
											.attributes.url
									}`}
									alt={`${productData?.attributes.images.data[currentImageIndex].attributes.hash}`}
								/>
							</div>
							<div className='product_images_preview'>
								{productData?.attributes.images.data.map((image, i) => (
									<div
										className={`preview_image ${
											i === currentImageIndex && "active"
										}`}
										onClick={() => setCurrentImageIndex(i)}
										key={image.attributes.hash}>
										<img
											src={`${import.meta.env.VITE_STRAPI_SERVER_IMAGE_URL}${
												image.attributes.url
											}`}
											alt={`${image.attributes.hash}`}
										/>
									</div>
								))}
							</div>
						</div>

						<div className='product_information_container'>
							<h1>{productData?.attributes.name}</h1>

							<h2>
								Brand: <span>{productData?.attributes.brand}</span>
							</h2>

							<h2 className='price'>${productData?.attributes.price}</h2>

							<div className='rated'>
								<p>Rated: </p>
								<div className='ratings'>
									{[1, 2, 3, 4, 5].map((_, i) => (
										<IoMdStarOutline key={i} />
									))}
								</div>
								<p>({productData?.attributes.reviews.data.length})</p>
							</div>

							<div className='cats_container'>
								<h1>Categories:</h1>
								<div>
									{productData?.attributes.categories.data.map((cat) => (
										<button key={cat.id}>{cat.attributes.name}</button>
									))}
								</div>
							</div>

							<div className='shipping'>
								<FaTruckFast />
								<span>Fast Delivery</span>

								<CiCircleCheck />
							</div>

							<p className='discount'>
								Discount: <span>{productData?.attributes.discount_rate}%</span>
							</p>

							<div className='product_buttons'>
								<div className='quantity_buttons'>
									<button
										onClick={() =>
											setProductQuantity(
												productQuantity > 1
													? productQuantity - 1
													: productQuantity,
											)
										}>
										<TiMinusOutline />
									</button>

									<span>( {productQuantity} )</span>

									<button
										onClick={() =>
											setProductQuantity(
												productQuantity < 9
													? productQuantity + 1
													: productQuantity,
											)
										}>
										<TiPlusOutline />
									</button>
								</div>

								<button
									onClick={() =>
										addProduct({
											id: productData?.id,
											name: productData?.attributes.name,
											imageUrl:
												productData?.attributes.images.data[0].attributes.url,
											price: productData?.attributes.price,
											quantity: productQuantity,
										})
									}>
									<span>Buy Now</span>
									<HiOutlineShoppingCart />
								</button>
							</div>
						</div>
					</div>
				)}

				{!isLoading && !error && productData && (
					<div className='product_description'>
						<h1>Description:</h1>

						<p>{productData?.attributes.description}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Product;
