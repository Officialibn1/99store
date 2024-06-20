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
						<h1>Top Sections</h1>
					</li>
					<li>
						<Link to={"/categories/men"}>Men</Link>
					</li>
					<li>
						<Link to={"/categories/women"}>Women</Link>
					</li>
					<li>
						<Link to={"/categories/accessories"}>Accessories</Link>
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
						<Link to={"/"}>Terms and conditions</Link>
					</li>
					<li>
						<Link to={"/"}>Privacy Policy</Link>
					</li>
					<li>
						<Link to={"/"}>Warranty</Link>
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
						href='https://www.linkedin.com/in/isah-muhammad-5046b125a/'
						target='_black'>
						<FaFacebook />
					</a>

					<a
						href='https://www.instagram.com/__ibn1?igsh=MTR0M2NkeTZlMnVjZQ%3D%3D&utm_source=qr'
						target='_black'>
						<FaInstagram />
					</a>

					<a
						href='/https://wa.me/message/4K7QPPNRCHWEF1'
						target='_black'>
						<FaWhatsapp />
					</a>

					<a
						href='www.tiktok.com/@isahibnmuhammad1'
						target='_black'>
						<FaTiktok />
					</a>

					<a
						href='https://x.com/__ibn1'
						target='_black'>
						<FaTwitter />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
