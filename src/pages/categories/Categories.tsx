import React, { useEffect, useState } from "react";
import "./Categories.scss";

// import { CgMenuGridO } from "react-icons/cg";
import axios from "axios";
import { ApiResponse, Categories as CategoriesType } from "./typings";
import { Link } from "react-router-dom";
import LoadingCategory from "../../components/ui/loading-category/LoadingCategory";
import ErrorPage from "../../components/ui/error-page/ErrorPage";

const Categories = () => {
	const [categorydata, setCategorydata] = useState<CategoriesType[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState();

	useEffect(() => {
		setIsLoading(true);
		const fetchCategories = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/categories?populate[image][fields][0]=url&populate[banner][fields][0]=url&pagination[pageSize]=10&pagination[page]=1`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				if (res.status === 200) {
					const data: ApiResponse = await res.data;

					setCategorydata(data.data);

					setApiError(null);

					setIsLoading(false);

					return;
				}
			} catch (error) {
				setApiError(error);

				setIsLoading(false);

				return;
			}

			setIsLoading(false);
		};

		fetchCategories();
	}, []);

	return (
		<div className='section_container'>
			<div className='categories_page_container'>
				{isLoading && [1, 2, 3].map((_, i) => <LoadingCategory key={i} />)}

				{!isLoading && apiError && <ErrorPage />}

				{!isLoading &&
					!apiError &&
					categorydata &&
					categorydata?.map((category) => (
						<Link
							to={`${category.attributes.url}`}
							key={category.id}
							className='top_categries_item'>
							<div>
								<img
									src={category.attributes.image.data.attributes.url}
									alt={`${
										category.attributes.name +
										" " +
										category.attributes.description
									}`}
								/>

								<span>{category.attributes.name}</span>

								<div>
									<p>{category.attributes.description}</p>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Categories;
