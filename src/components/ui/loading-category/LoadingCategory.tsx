import React from "react";
import "./LoadingCategory.scss";
const LoadingCategory = () => {
	return (
		<div className='loading_card_container'>
			<div className='category_image_loading_skeleton skeleton'></div>
		</div>
	);
};

export default LoadingCategory;
