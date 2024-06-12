interface ImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}

export interface HeroBannerData {
	id: number;
	attributes: {
		title: string;
		description: string;
		deal_type: string;
		discount_rate: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		image: {
			data: {
				id: number;
				attributes: {
					name: string;
					alternativeText: string | null;
					caption: string | null;
					width: number;
					height: number;
					formats: {
						thumbnail: ImageFormat;
						medium: ImageFormat;
						small: ImageFormat;
						large: ImageFormat;
					};
					hash: string;
					ext: string;
					mime: string;
					size: number;
					url: string;
					previewUrl: string | null;
					provider: string;
					provider_metadata: string | null;
					createdAt: string;
					updatedAt: string;
				};
			};
		};
	};
}

export interface HeroBannerDatasResponse {
	data: HeroBannerData[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}
