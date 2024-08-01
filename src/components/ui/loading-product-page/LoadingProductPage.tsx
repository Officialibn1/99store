import "../../../pages/product/Product.scss";
import "./LoadingProductPage.scss";

const LoadingProductPage = () => {
	return (
		<div className='product_image_information'>
			<div className='product_images_container'>
				<div className='loading_image_large skeleton'></div>

				<div className='product_images_preview'>
					{[1, 2, 3].map((_, i) => (
						<div
							className={`loading_preview_image skeleton`}
							key={i}></div>
					))}
				</div>
			</div>

			<div className='product_information_container'>
				<div className='loading_product_texts'>
					<div className='loading_product_text large skeleton'></div>
					<div className='loading_product_text  half skeleton'></div>
					<div className='loading_product_text skeleton'></div>
					<div className='loading_product_text half skeleton'></div>
					<div className='loading_product_text skeleton'></div>
					<div className='loading_product_text skeleton'></div>
					<div className='loading_product_text skeleton'></div>
				</div>

				<div className='product_buttons'>
					{/* <div className='quantity_buttons'>
                <button
                    onClick={() =>
                        setProductQuantity(
                            productQuantity > 1
                                ? productQuantity - 1
                                : productQuantity,
                        )
                    }>
                    <TiMinusOutline />
                </button>

                <span>( {productQuantity} )</span>

                <button
                    onClick={() =>
                        setProductQuantity(
                            productQuantity < 9
                                ? productQuantity + 1
                                : productQuantity,
                        )
                    }>
                    <TiPlusOutline />
                </button>
            </div> */}

					{/* <button
                onClick={() =>
                    addProduct({
                        id: productData?.id,
                        name: productData?.attributes.name,
                        imageUrl:
                            productData?.attributes.images.data[0].attributes.url,
                        price: productData?.attributes.price,
                        quantity: productQuantity,
                    })
                }>
                <span>Add to Cart</span>
                <HiOutlineShoppingCart />
            </button> */}
				</div>
			</div>
		</div>
	);
};

export default LoadingProductPage;
