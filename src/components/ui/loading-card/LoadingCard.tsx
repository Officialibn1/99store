import React from "react";
import "./LoadingCard.scss";

const LoadingCard = () => {
	return (
		<div className='loading_card_container'>
			<div className='image_loading_skeleton skeleton'></div>

			<div className='skeleton_text skeleton'></div>

			<div className='loading_gap'>
				<div className='skeleton_text skeleton'></div>
				<div className='skeleton_text skeleton'></div>
			</div>

			<div className='loading_gap'>
				<div className='favourite_skeleton skeleton'></div>
				<div className='button_skeleton skeleton'></div>
			</div>
		</div>
	);
};

export default LoadingCard;
