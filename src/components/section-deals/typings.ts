interface ImageData {
	id: number;
	attributes: {
		hash: string;
		url: string;
	};
}

interface Images {
	data: ImageData[];
}

interface ReviewData {
	// Assuming an empty array, define the structure when necessary
}

interface Reviews {
	data: ReviewData[];
}

interface CategoryAttributes {
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

interface CategoryData {
	id: number;
	attributes: CategoryAttributes;
}

export interface Product {
	id: number;
	attributes: {
		name: string;
		description: string;
		price: number;
		slug: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		new_listing: boolean;
		attribute: string;
		discount_rate: number;
		brand: string;
		images: Images;
		reviews: Reviews;
		categories: {
			data: CategoryData[];
		};
	};
}

export interface ProductResponse {
	data: Product[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
