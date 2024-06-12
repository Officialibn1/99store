import React, { useEffect, useState } from "react";
import "./About.scss";
import axios from "axios";
import { AboutUsBanner, AboutUsBannerResponse } from "./typing";
import ServicesSection from "../../components/services-section/ServicesSection";

const About = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [aboutUsData, setAboutUsData] = useState<AboutUsBanner[]>([]);

	const [error, setError] = useState();
	useEffect(() => {
		setIsLoading(true);
		const fetchAboutUsDate = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/about-uses?populate[image][fields][0]=url&populate[image][fields][1]=hash`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				// throw new Error("");

				if (res.status === 200) {
					const data: AboutUsBannerResponse = await res.data;

					setAboutUsData(data.data);
					setError(null);
				}
			} catch (error) {
				setError(error);
			}

			setIsLoading(false);
		};

		fetchAboutUsDate();
	}, []);

	if (error) {
		return (
			<div className='section_container'>
				<div className='about_us_container'>
					<h1>Something went wrong. . .</h1>
				</div>
			</div>
		);
	}
	return (
		<div className='section_container'>
			<div className='about_us_container'>
				<div className='about_us_hero'>
					<img
						src={`${import.meta.env.VITE_STRAPI_SERVER_IMAGE_URL}${
							aboutUsData[0]?.attributes.image.data.attributes.url
						}`}
						alt={`${aboutUsData[0]?.attributes.image.data.attributes.hash}`}
					/>

					<div className='about_us_hero_text'>
						<h1>{aboutUsData[0]?.attributes.title}</h1>

						<p>{aboutUsData[0]?.attributes.description}</p>
					</div>
				</div>

				<ServicesSection />

				<div className='about_us_main_section'>
					<p>
						99 Store is an eCommerce startup founded in 2024 and backed by many
						brands. We offer a variety of products for our customers at the best
						price in the market.
					</p>

					<p>
						At 99 Store, we believe that shopping should be easy, enjoyable, and
						affordable. Founded with the mission to bring you the best deals on
						a wide range of products, we are committed to providing an
						exceptional online shopping experience. From fashion and electronics
						to home essentials and beauty products, we have everything you need
						under one virtual roof.
					</p>

					<h1>Our Vision</h1>

					<p>
						To be your go-to online store for value and convenience, offering a
						seamless shopping experience with a diverse selection of
						high-quality products at everyday low prices.
					</p>

					<h1>Our Values</h1>

					<ul>
						<li>
							<p>
								<span>Customer First: </span>Your satisfaction is our top
								priority. We strive to meet your needs with excellent customer
								service and a hassle-free shopping experience.
							</p>
						</li>

						<li>
							<p>
								<span>Quality Assurance:</span> We carefully select our products
								to ensure they meet our high standards, so you can shop with
								confidence.
							</p>
						</li>

						<li>
							<p>
								<span>Affordability: </span>We believe everyone deserves access
								to great products without breaking the bank. Our goal is to
								provide the best value for your money.
							</p>
						</li>

						<li>
							<p>
								<span>Innovation: </span>We are constantly updating our
								inventory and improving our platform to offer you the latest
								trends and a smooth shopping journey.
							</p>
						</li>
					</ul>

					<p>
						Join the 99 Store community today and discover why thousands of
						customers trust us for their shopping needs. We look forward to
						serving you and making your shopping experience delightful and
						rewarding.
					</p>

					<br />
					<br />

					<p>Happy shopping!</p>
				</div>
			</div>
		</div>
	);
};

export default About;
