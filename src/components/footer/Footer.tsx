import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

import {
	FaFacebook,
	FaInstagram,
	FaWhatsapp,
	FaTiktok,
	FaTwitter,
	FaOpencart,
} from "react-icons/fa6";

const Footer = () => {
	return (
		<footer>
			<div className='left'>
				<div className='footer_logo'>
					<FaOpencart />
				</div>

				<p>
					99 Store is an eCommerce startup founded in 2024 and backed by many
					brands. We offer a variety of products for our customers at the best
					price in the market.
				</p>
			</div>
			<div className='middle'>
				<ul>
					<li>
						<h1>Product Sections</h1>
					</li>
					<li>
						<Link to={"/men"}>Men</Link>
					</li>
					<li>
						<Link to={"/women"}>Women</Link>
					</li>
					<li>
						<Link to={"/watch"}>Watch</Link>
					</li>
					<li>
						<Link to={"/ear buds"}>EarBuds</Link>
					</li>
				</ul>

				<ul>
					<li>
						<h1>Useful Links</h1>
					</li>
					<li>
						<Link to={"/about"}>About Us</Link>
					</li>
					<li>
						<Link to={"/terms"}>Terms and conditions</Link>
					</li>
					<li>
						<Link to={"/privacy"}>Privacy Policy</Link>
					</li>
					<li>
						<Link to={"/warranty"}>Warranty</Link>
					</li>
				</ul>
			</div>
			<div className='right'>
				<h1>Contact Us</h1>

				<p>70 Washington Square South, New York, NY 10012, United States</p>

				<p>Email: officialibn001@gmail.com</p>

				<p>Phone: +2349038880282</p>

				<div>
					<a
						href='/'
						target='_black'>
						<FaFacebook />
					</a>

					<a
						href='/'
						target='_black'>
						<FaInstagram />
					</a>

					<a
						href='/'
						target='_black'>
						<FaWhatsapp />
					</a>

					<a
						href='/'
						target='_black'>
						<FaTiktok />
					</a>

					<a
						href='/'
						target='_black'>
						<FaTwitter />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
