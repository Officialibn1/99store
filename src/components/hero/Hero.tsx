import axios from "axios";
import "./Hero.scss";
import React, { useEffect, useState } from "react";
import { HeroBannerData, HeroBannerDatasResponse } from "./typings";
import { Link } from "react-router-dom";
import { LuBadge } from "react-icons/lu";
import { Player } from "@lottiefiles/react-lottie-player";

const Hero = () => {
	const [heroData, setHeroData] = useState<HeroBannerData>();
	const [fetchDataLoading, setFetchDataLoading] = useState(false);
	const [fetchDataError, setFetchDataError] = useState();

	console.log(heroData);

	useEffect(() => {
		setFetchDataLoading(true);
		const fetchHeroData = async () => {
			try {
				// throw new Error("");
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

					setFetchDataError(null);
				}
			} catch (error) {
				setFetchDataError(error);
			}
			setFetchDataLoading(false);
		};

		fetchHeroData();
	}, []);

	// if (fetchDataLoading) {
	// 	return <h1 style={{ marginTop: "5rem" }}>Fetching Data. . .</h1>;
	// }

	return (
		<div className='hero_container'>
			{fetchDataLoading ? (
				<div className='hero_data_loading'></div>
			) : !fetchDataLoading && fetchDataError ? (
				<div className='hero_data_error'>
					<Player
						autoplay
						loop
						src='/ErrorPage.json'
					/>
					<h1>Error Fetcing Hero Data!!</h1>
				</div>
			) : (
				<>
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
							<img src={heroData?.attributes.image.data?.attributes.url} />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Hero;
