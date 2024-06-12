import axios from "axios";
import "./Hero.scss";
import React, { useEffect, useState } from "react";
import { HeroBannerData, HeroBannerDatasResponse } from "./typings";
import { Link } from "react-router-dom";
import { LuBadge } from "react-icons/lu";

const Hero = () => {
	const [heroData, setHeroData] = useState<HeroBannerData>();
	const [fetchDataLoading, setFetchDataLoading] = useState(false);
	const [fetchDataError, setFetchDataError] = useState();

	useEffect(() => {
		setFetchDataLoading(true);
		const fetchHeroData = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/hero-banners?populate=*`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				const api_data: HeroBannerDatasResponse = response.data;

				if (response.status === 200) {
					setHeroData(api_data.data[0]);
				}
			} catch (error) {
				setFetchDataError(error);
			}
			setFetchDataLoading(false);
		};

		fetchHeroData();
	}, []);

	if (fetchDataLoading) {
		return <h1 style={{ marginTop: "5rem" }}>Fetching Data. . .</h1>;
	}

	return (
		<div className='hero_container'>
			<div className='hero_text'>
				<h1>{heroData?.attributes.title}</h1>

				<p>{heroData?.attributes.description}</p>

				<Link to={"/"}>Shop Now</Link>
			</div>

			<div className='hero_image'>
				<div className='offer_badge'>
					<div>
						<span>{heroData?.attributes.discount_rate}</span>
						<LuBadge />
					</div>
				</div>
				{heroData && (
					<img
						src={`${import.meta.env.VITE_STRAPI_SERVER_IMAGE_URL}${
							heroData?.attributes.image.data?.attributes.url
						}`}
					/>
				)}
			</div>
		</div>
	);
};

export default Hero;
