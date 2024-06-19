/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./Category.scss";

import {
	Product,
	ProductResponse,
} from "../../components/section-deals/typings";
import ProductCard from "../../components/product-card/ProductCard";
import { CategoriesFilter, CategoriesFilterResponse } from "./typings";
import { BiCheck } from "react-icons/bi";
import LoadingCard from "../../components/ui/loading-card/LoadingCard";
import ErrorPage from "../../components/ui/error-page/ErrorPage";
import EmptyPage from "../../components/ui/empty-page/EmptyPage";

const Category = () => {
	const [products, setProducts] = useState<Product[]>();
	const [categoriesFilter, setCategoriesFilter] =
		useState<CategoriesFilter[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState();
	const [fetchCategoriesError, setFetchCategoriesError] = useState();

	const [subCategoriesFilterParam, setSubCategoriesFilterParam] = useState<
		string[]
	>([]);

	const [sortByPriceFilterParam, setSortByPriceFilterParam] = useState("");

	const [sortByDateFilterParam, setSortByDateFilterParam] = useState("");

	const param = useParams();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/categories?[filters][url]=${
						param.id
					}&populate[sub_categories][fields][0]=name&populate[sub_categories][fields][1]=url`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				if (res.status === 200) {
					const data: CategoriesFilterResponse = await res.data;

					setCategoriesFilter(data.data);

					setFetchCategoriesError(null);
				}
			} catch (error) {
				setFetchCategoriesError(error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		// ${
		// 	sortByPriceFilterParam && `&sort[0]=price:${sortByPriceFilterParam}`
		// }${
		// 	sortByDateFilterParam &&
		// 	`&sort[0]=createdAt:${sortByDateFilterParam}`
		// }

		const fetchProducts = async () => {
			await new Promise((resolve) => setTimeout(resolve, 3000));

			try {
				/* prettier-ignore */
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/Products?filters[categories][url]=${
						param.id
					}&populate[images][fields][0]=url&populate[images][fields][1]=hash${subCategoriesFilterParam?.map((filter, index) => `&filters[sub_categories][url][${index}]=${filter}`).join('')}${sortByPriceFilterParam && `&sort[0]=price:${sortByPriceFilterParam}`}${sortByDateFilterParam && `&sort[1]=createdAt:${sortByDateFilterParam}`}`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				/* prettier-ignore */

				// console.log(`${subCategoriesFilterParam?.map((filter, index) => `&filters[sub_categories][url][${index}]=${filter}`)}`);

				// throw new Error("Error");

				if (res.status === 200) {
					const data: ProductResponse = await res.data;

					setProducts(data.data);
					setApiError(null);
				}
			} catch (error) {
				setApiError(error);
			}
			setIsLoading(isLoading === true && false);
		};

		fetchProducts();
	}, [subCategoriesFilterParam, sortByPriceFilterParam, sortByDateFilterParam]);

	const handleSubcategoriesSelect = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;

		const isSelected = e.target.checked;

		const array = isSelected
			? [...subCategoriesFilterParam, value]
			: subCategoriesFilterParam.filter((sub) => sub !== value);

		// prettier-ignore
		setSubCategoriesFilterParam(array)
	};

	return (
		<div className='category_page_wrapper'>
			{
				<div className='category_page_container'>
					<div className='category_page_filter'>
						<div className='category_filter_group'>
							<h1>Sub-Categories</h1>

							{categoriesFilter && categoriesFilter?.length > 0 ? (
								categoriesFilter[0]?.attributes.sub_categories?.data?.map(
									(filter) => (
										<label
											htmlFor={filter.attributes.name}
											key={filter.attributes.name}>
											<input
												type='checkbox'
												name={filter.attributes.name}
												id={filter.attributes.name}
												value={filter.attributes.url}
												onChange={handleSubcategoriesSelect}
											/>

											<span className='check'>
												<BiCheck />
											</span>

											<span>{filter.attributes.name}</span>
										</label>
									),
								)
							) : (
								<span>. . . .</span>
							)}

							{categoriesFilter && fetchCategoriesError ? (
								<span>Error fetching categories</span>
							) : (
								categoriesFilter &&
								categoriesFilter[0]?.attributes.sub_categories?.data?.length ===
									0 && <span>There are no filters</span>
							)}
						</div>

						<div className='category_filter_group'>
							<h1>Sort By(Price):</h1>

							<label>
								<input
									type='radio'
									name='price'
									id='price'
									key='price'
									value=''
									onChange={(e) => setSortByPriceFilterParam(e.target.value)}
								/>

								<span className='radio'>
									<BiCheck />
								</span>

								<span>None</span>
							</label>

							<label>
								<input
									type='radio'
									name='price'
									id='price'
									key='price'
									value='asc'
									onChange={(e) => setSortByPriceFilterParam(e.target.value)}
								/>

								<span className='radio'>
									<BiCheck />
								</span>

								<span>Price (Asc)</span>
							</label>

							<label>
								<input
									type='radio'
									name='price'
									id='price'
									key='price'
									value='desc'
									onChange={(e) => setSortByPriceFilterParam(e.target.value)}
								/>

								<span className='radio'>
									<BiCheck />
								</span>

								<span>Price (Desc)</span>
							</label>
						</div>

						<div className='category_filter_group'>
							<h1>Sort By(Date):</h1>

							<label>
								<input
									type='radio'
									name='Date'
									id='Date'
									key='Date'
									value=''
									onChange={(e) => setSortByDateFilterParam(e.target.value)}
								/>

								<span className='radio'>
									<BiCheck />
								</span>

								<span>None</span>
							</label>

							<label>
								<input
									type='radio'
									name='Date'
									id='Date'
									key='Date'
									value='asc'
									onChange={(e) => setSortByDateFilterParam(e.target.value)}
								/>

								<span className='radio'>
									<BiCheck />
								</span>

								<span>Date (Asc)</span>
							</label>

							<label>
								<input
									type='radio'
									name='Date'
									id='Date'
									key='Date'
									value='desc'
									onChange={(e) => setSortByDateFilterParam(e.target.value)}
								/>

								<span className='radio'>
									<BiCheck />
								</span>

								<span>Date (Desc)</span>
							</label>
						</div>
					</div>
					<div className='grid_container category_page_products'>
						{isLoading ? (
							[1, 2, 3, 4, 5, 6].map((_, i) => <LoadingCard key={i} />)
						) : !isLoading && apiError ? (
							<ErrorPage />
						) : !isLoading && !apiError && products && !products.length ? (
							<EmptyPage
								text={`Sorry, there is no product in the ${param.id} category!`}
							/>
						) : (
							products?.map((product) => (
								<ProductCard
									key={product.id}
									{...product}
								/>
							))
						)}
					</div>
				</div>
			}
		</div>
	);
};

export default Category;
