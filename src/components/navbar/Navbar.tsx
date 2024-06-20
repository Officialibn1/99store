import React, { useState } from "react";
import "./Navbar.scss";
import {
	FaFacebook,
	FaInstagram,
	FaOpencart,
	FaTiktok,
	FaTwitter,
} from "react-icons/fa6";
import { RiMenu4Line } from "react-icons/ri";
import { CiSearch, CiHeart } from "react-icons/ci";
import { GiConverseShoe, GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoIosFemale, IoIosMale, IoMdClose } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { PiPantsThin, PiTShirtThin } from "react-icons/pi";
import { MdOutlineChildCare } from "react-icons/md";
import { useAppSelector } from "../../redux/redux-hooks";

const Navbar = () => {
	const [showNav, setShowNav] = useState(false);

	const [showCategories, setShowCategories] = useState(false);

	const items = useAppSelector((state) => state?.cart?.products?.length);

	const favouriteItems = useAppSelector(
		(state) => state?.favourite?.products?.length,
	);

	const search = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<div className='nav_wrapper'>
			<nav>
				<div className='mobile_nav_toggle'>
					<button onClick={() => setShowNav(!showNav)}>
						<RiMenu4Line />
					</button>
				</div>

				<div
					className='mobile_nav'
					style={{ top: showNav ? 0 : "-200vh" }}>
					<div className='mobile_nav_close'>
						<button onClick={() => setShowNav(!showNav)}>
							<IoMdClose />
						</button>
					</div>

					<ul>
						<li>
							<Link
								to={"/"}
								onClick={() => setShowNav(!showNav)}>
								Home
							</Link>
						</li>
						<li>
							<Link
								to={"/products"}
								onClick={() => setShowNav(!showNav)}>
								Products
							</Link>
						</li>
						<li>
							<Link
								to={"/categories"}
								onClick={() => setShowNav(!showNav)}>
								Categories
							</Link>
						</li>
						<li>
							<Link
								to={"/about"}
								onClick={() => setShowNav(!showNav)}>
								About Us
							</Link>
						</li>
					</ul>

					<div className='nav_socials'>
						<Link to={"/"}>
							<FaFacebook />
						</Link>
						<Link to={"/"}>
							<FaTwitter />
						</Link>
						<Link to={"/"}>
							<FaInstagram />
						</Link>
						<Link to={"/"}>
							<FaTiktok />
						</Link>
					</div>
				</div>

				<div className='logo'>
					<Link to={"/"}>
						<FaOpencart />
					</Link>
				</div>

				<form
					onSubmit={(e) => search(e)}
					className='desktop_search'>
					<input
						type='text'
						name='search'
						id='search'
						disabled
					/>
					<span>
						<CiSearch />
					</span>
				</form>

				<div className='profile_cart'>
					<Link to={"/favourites"}>
						<button className='shopping_cart'>
							<CiHeart />
							<span>{favouriteItems}</span>
						</button>
					</Link>

					<Link to={"/cart"}>
						<button className='shopping_cart'>
							<GiShoppingCart />
							<span>{items}</span>
						</button>
					</Link>
				</div>
			</nav>

			<div className='desktop_links_wrapper'>
				<div className='categories'>
					<button onClick={() => setShowCategories(!showCategories)}>
						<CgMenuGridO />
						<span>Categories</span>
					</button>
				</div>

				{showCategories && (
					<div className='categoreis_list'>
						<Link
							to={"/"}
							onClick={() => setShowCategories(!showCategories)}
							className='categoreis_item'>
							<IoIosMale />
							<span>Male</span>
						</Link>
						<Link
							to={"/"}
							onClick={() => setShowCategories(!showCategories)}
							className='categoreis_item'>
							<IoIosFemale />
							<span>Female</span>
						</Link>
						<Link
							to={"/"}
							onClick={() => setShowCategories(!showCategories)}
							className='categoreis_item'>
							<PiTShirtThin />
							<span>Shirt</span>
						</Link>
						<Link
							to={"/"}
							onClick={() => setShowCategories(!showCategories)}
							className='categoreis_item'>
							<PiPantsThin />
							<span>Pants</span>
						</Link>
						<Link
							to={"/"}
							onClick={() => setShowCategories(!showCategories)}
							className='categoreis_item'>
							<MdOutlineChildCare />
							<span>Kids</span>
						</Link>
						<Link
							to={"/"}
							onClick={() => setShowCategories(!showCategories)}
							className='categoreis_item'>
							<GiConverseShoe />
							<span>Shoes</span>
						</Link>
					</div>
				)}

				<div className='nav_links_desktop'>
					<ul>
						<li>
							<Link to={"/"}>Home</Link>
						</li>
						<li>
							<Link to={"/categories"}>Categories</Link>
						</li>
						<li>
							<Link to={"/products"}>Products</Link>
						</li>
						<li>
							<Link to={"/about"}>About Us</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
