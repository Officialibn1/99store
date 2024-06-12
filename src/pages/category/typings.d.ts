export interface SubCategoryData {
	id: number;
	attributes: {
		name: string;
		url: string;
	};
}

export interface CategoriesFilter {
	id: number;
	attributes: {
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		url: string;
		sub_categories: {
			data: SubCategoryData[];
		};
	};
}

export interface CategoriesFilterResponse {
	data: CategoriesFilter[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
