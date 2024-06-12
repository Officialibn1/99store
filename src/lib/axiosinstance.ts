"use client";
import axios from "axios";

export const axiosRequst = axios.create({
	baseURL: import.meta.env.STRAPI_DEVELOPMENT_SERVER_URL,
	headers: {
		Authorization: `Bearer ${JSON.stringify(
			import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN,
		)}`,
	},
});
