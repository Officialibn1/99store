import React from "react";
import "./ErrorPage.scss";
import { Player } from "@lottiefiles/react-lottie-player";

const ErrorPage = () => {
	return (
		<div className='error_page_wrapper'>
			<div>
				<Player
					autoplay
					loop
					src='/ErrorPage.json'
				/>
			</div>
			<h1>Oopss. . . Something went wrong, please refesh page!!</h1>
		</div>
	);
};

export default ErrorPage;
