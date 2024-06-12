export interface CategoryAndSubCategoryData {
	id: number;
	attributes: {
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		url: string;
	};
}

export interface CategoryAndSubCategoriesResponse {
	data: CategoryAndSubCategoryData[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
