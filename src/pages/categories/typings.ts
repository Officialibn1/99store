export interface Categories {
	id: number;
	attributes: {
		name: string;
		description: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		url: string;
		image: {
			data: {
				id: number;
				attributes: {
					url: string;
				};
			};
		};
		banner: {
			data: {
				id: number;
				attributes: {
					url: string;
				};
			};
		};
	};
}

export interface ApiResponse {
	data: Categories[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
