import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import "./EmptyPage.scss";

const EmptyPage = () => {
	return (
		<div className='empty_page_wrapper'>
			<div>
				<Player
					autoplay
					loop
					src='/EmptyPage.json'
				/>
			</div>
			<h1>Sorry, there is no product that match your search/filters!!</h1>
		</div>
	);
};

export default EmptyPage;
