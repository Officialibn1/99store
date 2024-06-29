import React, { useEffect, useState } from "react";
import "./CategoriesSection.scss";
import SectionHeader from "../section-header/SectionHeader";

import { CgMenuGridO } from "react-icons/cg";
import axios from "axios";
import { ApiResponse, Categories } from "./typings";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
	const [categorydata, setCategorydata] = useState<Categories[]>();
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
			<SectionHeader
				icon={<CgMenuGridO />}
				title='Top Categories'
				key={"top_categories"}
				link='categories'
			/>

			{!isLoading && apiError && (
				<h1>Error fetching Categroies from api, please refresh page. . .</h1>
			)}

			<div className='top_categories_grid'>
				{isLoading &&
					[1, 2, 3].map((_, i) => (
						<div
							className='loading_categories_ui'
							key={i}></div>
					))}

				{!isLoading &&
					categorydata?.map((category) => (
						<Link
							to={`/categories/${category.attributes.url}`}
							key={category.id}
							className='top_categries_item'>
							<div>
								<img
									src={category.attributes.banner.data.attributes.url}
									alt={`${
										category.attributes.name +
										" " +
										category.attributes.description
									}`}
								/>

								<span>{category.attributes.name}</span>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default CategoriesSection;
