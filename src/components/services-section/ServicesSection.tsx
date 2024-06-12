import React, { ReactNode } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { RiCustomerService2Line, RiSecurePaymentFill } from "react-icons/ri";
import "./ServicesSection.scss";

type Services = {
	id: number;
	icon: ReactNode;
	title: string;
	description: string;
};

const services: Services[] = [
	{
		id: 1,
		icon: <FaTruckFast />,
		title: "Worldwide Delivery",
		description:
			"We deliver products and ship daily to over 120 countries around the world!",
	},
	{
		id: 2,
		icon: <RiSecurePaymentFill />,
		title: "Safe Payment",
		description:
			"Enjoy Easy, Safe and Secure payment across our platform, with support fo over 13 payment services.",
	},
	{
		id: 3,
		icon: <GoShieldCheck />,
		title: "Shop With Confidence",
		description:
			"Our warranty have you covered, so you dont have to worry about the quality of your goods you buy.",
	},
	{
		id: 4,
		icon: <RiCustomerService2Line />,
		title: "24/7 Support",
		description:
			"Enjoy 24 hours support across 7 days of the week, our customer service are always available to listen to your complains!",
	},
];

const ServicesSection = () => {
	return (
		<div className='services_section_container'>
			<div className='services_section_grid'>
				{services.map((service) => (
					<div
						className='services_item'
						key={service.id}>
						<span>{service.icon}</span>

						<h1>{service.title}</h1>

						<p>{service.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ServicesSection;
