import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url: string) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.STRAPI_DEVELOPMENT_SERVER_URL}${url}`,
					{
						headers: {
							Authorization: `Bearer ${JSON.stringify(
								import.meta.env.VITE_STRAPI_CMS_DEVELOPER_TOKEN,
							)}`,
						},
					},
				);

				if (res.status === 200) {
					setData(res.data);
				}
			} catch (error) {
				setError(error as null);
			}
			setLoading(false);
		};

		fetchData();
	}, [url]);

	return { loading, data, error };
};

export default useFetchData;
