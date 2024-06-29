/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import React, { useEffect, useState } from "react";

import "./Products.scss";

import {
	Product,
	ProductResponse,
} from "../../components/section-deals/typings";
import ProductCard from "../../components/product-card/ProductCard";
import { BiCheck } from "react-icons/bi";
import {
	CategoryAndSubCategoryData,
	CategoryAndSubCategoriesResponse,
} from "./typings";
import EmptyPage from "../../components/ui/empty-page/EmptyPage";
import ErrorPage from "../../components/ui/error-page/ErrorPage";
import LoadingCard from "../../components/ui/loading-card/LoadingCard";
import { CiFilter } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Products = () => {
	const [products, setProducts] = useState<Product[]>();

	const [categoriesFilter, setCategoriesFilter] =
		useState<CategoryAndSubCategoryData[]>();

	const [subCategoriesFilter, setSubCategoriesFilter] =
		useState<CategoryAndSubCategoryData[]>();

	const [isLoading, setIsLoading] = useState(false);

	const [apiError, setApiError] = useState();

	const [showMobileFiler, setShowMobileFiler] = useState(false);

	const [fetchSubCategoriesError, setFetchSubCategoriesError] = useState();

	const [fetchCategoriesError, setFetchCategoriesError] = useState();

	const [subCategoriesFilterParam, setSubCategoriesFilterParam] = useState<
		string[]
	>([]);

	const [categoriesFilterParam, setCategoriesFilterParam] = useState<string[]>(
		[],
	);

	const [sortByPriceFilterParam, setSortByPriceFilterParam] = useState("");

	const [sortByDateFilterParam, setSortByDateFilterParam] = useState("");

	useEffect(() => {
		const fetchSubCategories = async () => {
			try {
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/sub-categories`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				if (res.status === 200) {
					const data: CategoryAndSubCategoriesResponse = await res.data;

					setSubCategoriesFilter(data.data);

					setFetchSubCategoriesError(null);
				}
			} catch (error) {
				setFetchSubCategoriesError(error);
			}
		};

		const fetchCategories = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL}/categories`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				if (res.status === 200) {
					const data: CategoryAndSubCategoriesResponse = await res.data;

					setCategoriesFilter(data.data);

					setFetchCategoriesError(null);
				}
			} catch (error) {
				setFetchCategoriesError(error);
			}
		};

		fetchCategories();

		fetchSubCategories();
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
			try {
				// await new Promise((resolve) => setTimeout(resolve, 3000));

				/* prettier-ignore */
				const res = await axios.get(
					`${
						import.meta.env.VITE_STRAPI_DEVELOPMENT_SERVER_URL
					}/Products?populate[images][fields][0]=url&populate[images][fields][1]=hash${categoriesFilterParam?.map((filter, index) => `&filters[categories][url][${index}]=${filter}`).join('')}${subCategoriesFilterParam?.map((filter, index) => `&filters[sub_categories][url][${index}]=${filter}`).join('')}${sortByPriceFilterParam && `&sort[0]=price:${sortByPriceFilterParam}`}${sortByDateFilterParam && `&sort[1]=createdAt:${sortByDateFilterParam}`}`,
					{
						headers: {
							Authorization: `Bearer ${
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN
							}`,
						},
					},
				);

				// throw new Error("Oopss");

				/* prettier-ignore */
				// console.log(
				// 	`${categoriesFilterParam
				// 		?.map((filter, index) => `&filters[categories][url][${index}]=${filter}`).join("")}`);

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
	}, [
		subCategoriesFilterParam,
		categoriesFilterParam,
		sortByPriceFilterParam,
		sortByDateFilterParam,
	]);

	const handlecategoriesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		const isSelected = e.target.checked;

		const array = isSelected
			? [...categoriesFilterParam, value]
			: categoriesFilterParam.filter((sub) => sub !== value);

		// prettier-ignore
		setCategoriesFilterParam(array)
	};

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

	// const handleSortByDate = (filter: string) => {
	// 	setSortByDateFilterParam(sortByDateFilterParam !== filter && filter);
	// };

	// console.log(sortByDateFilterParam === "asc");
	return (
		<div className='category_page_wrapper section_container'>
			{
				<div className='category_page_container'>
					<div className='mobile_sort_button'>
						<button onClick={() => setShowMobileFiler(!showMobileFiler)}>
							<span>Filters</span>
							<CiFilter />
						</button>
					</div>

					<div
						className='mobile_sort_filters_container'
						style={{
							left: showMobileFiler ? "0px" : "-100vw",
							display: showMobileFiler ? "flex" : "none",
						}}>
						<div
							className='mobile_sort_button'
							style={{ marginLeft: "auto" }}>
							<button onClick={() => setShowMobileFiler(!showMobileFiler)}>
								<span>Close</span>
								<IoMdClose />
							</button>
						</div>

						<div className='category_filter_group'>
							<h1>Categories</h1>

							{categoriesFilter && categoriesFilter?.length > 0 ? (
								categoriesFilter.map((filter) => (
									<label
										htmlFor={filter.attributes.name}
										key={`mobile_${filter.attributes.name}`}>
										<input
											type='checkbox'
											name={filter.attributes.name}
											id={filter.attributes.name}
											value={filter.attributes.url}
											onChange={handlecategoriesSelect}
										/>

										<span className='check'>
											<BiCheck />
										</span>

										<span>{filter.attributes.name}</span>
									</label>
								))
							) : (
								<span>Fetching Categories</span>
							)}

							{categoriesFilter && fetchCategoriesError ? (
								<span>Error fetching categories</span>
							) : (
								categoriesFilter &&
								categoriesFilter.length === 0 && (
									<span>There are no filters</span>
								)
							)}
						</div>

						<div className='category_filter_group'>
							<h1>Sub-Categories</h1>

							{subCategoriesFilter && subCategoriesFilter?.length > 0 ? (
								subCategoriesFilter.map((filter) => (
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
								))
							) : (
								<span>Fetching Sub Categories</span>
							)}

							{subCategoriesFilter && fetchSubCategoriesError ? (
								<span>Error fetching sub categories</span>
							) : (
								subCategoriesFilter &&
								subCategoriesFilter.length === 0 && (
									<span>There are no filters</span>
								)
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
									// checked={sortByPriceFilterParam === ""}
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
									// checked={sortByPriceFilterParam === "asc"}
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
									// checked={sortByPriceFilterParam === "desc"}
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

					<div className='category_page_filter'>
						<div className='category_filter_group'>
							<h1>Categories</h1>

							{categoriesFilter && categoriesFilter?.length > 0 ? (
								categoriesFilter.map((filter) => (
									<label
										htmlFor={filter.attributes.name}
										key={filter.attributes.name}>
										<input
											type='checkbox'
											name={filter.attributes.name}
											id={filter.attributes.name}
											value={filter.attributes.url}
											onChange={handlecategoriesSelect}
											checked={categoriesFilterParam.includes(
												filter.attributes.url,
											)}
										/>

										<span className='check'>
											<BiCheck />
										</span>

										<span>{filter.attributes.name}</span>
									</label>
								))
							) : (
								<span>Fetching Categories</span>
							)}

							{categoriesFilter && fetchCategoriesError ? (
								<span>Error fetching categories</span>
							) : (
								categoriesFilter &&
								categoriesFilter.length === 0 && (
									<span>There are no filters</span>
								)
							)}
						</div>

						<div className='category_filter_group'>
							<h1>Sub-Categories</h1>

							{subCategoriesFilter && subCategoriesFilter?.length > 0 ? (
								subCategoriesFilter.map((filter) => (
									<label
										htmlFor={filter.attributes.name}
										key={filter.attributes.name}>
										<input
											type='checkbox'
											name={filter.attributes.name}
											id={filter.attributes.name}
											value={filter.attributes.url}
											onChange={handleSubcategoriesSelect}
											checked={subCategoriesFilterParam.includes(
												filter.attributes.url,
											)}
										/>

										<span className='check'>
											<BiCheck />
										</span>

										<span>{filter.attributes.name}</span>
									</label>
								))
							) : (
								<span>Fetching Sub Categories</span>
							)}

							{subCategoriesFilter && fetchSubCategoriesError ? (
								<span>Error fetching sub categories</span>
							) : (
								subCategoriesFilter &&
								subCategoriesFilter.length === 0 && (
									<span>There are no filters</span>
								)
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
							<EmptyPage />
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

export default Products;
