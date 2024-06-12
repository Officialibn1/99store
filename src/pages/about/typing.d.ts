export interface AboutUsBanner {
	id: number;
	attributes: {
		title: string;
		description: string;
		email: string;
		phone_number: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		image: {
			data: {
				id: number;
				attributes: {
					url: string;
					hash: string;
				};
			};
		};
	};
}

export interface AboutUsBannerResponse {
	data: AboutUsBanner[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
