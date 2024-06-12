import React, { ReactNode, useEffect, useState } from "react";
import SectionHeader from "../section-header/SectionHeader";
import "./SectionDeals.scss";
import "../utility-styles/grid-container.scss";
import axios from "axios";
import { Product, ProductResponse } from "./typings";
import ProductCard from "../product-card/ProductCard";

type Props = {
	icon: ReactNode;
	title: string;
	link?: string;
	queryUrl: string;
};

const SectionDeals = (props: Props) => {
	const [products, setProducts] = useState<Product[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/Products?[filters][attribute]=${
						props.queryUrl
					}&populate[images][fields][0]=url&populate[images][fields][1]=hash`,
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
					setProducts(data.data);
					setIsLoading(false);
				}
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className='section_container'>
			<SectionHeader
				icon={props.icon}
				title={props.title}
				link={props.link && props.link}
			/>

			<div className='grid_container'>
				{isLoading && <h1>Fetching Data. . .</h1>}

				{error && !isLoading && (
					<h1>Something went wrong, please refresh the page. . .</h1>
				)}

				{!error &&
					!isLoading &&
					products?.map((product) => (
						<ProductCard
							{...product}
							key={product.id}
						/>
					))}
			</div>
		</div>
	);
};

export default SectionDeals;
