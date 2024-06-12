import SectionDeals from "../../components/section-deals/SectionDeals";
import Hero from "../../components/hero/Hero";
import { IoIosFlash } from "react-icons/io";
import { SiFireship } from "react-icons/si";
import CategoriesSection from "../../components/categories-section/CategoriesSection";
import ServicesSection from "../../components/services-section/ServicesSection";

const Home = () => {
	return (
		<div>
			<Hero />

			<SectionDeals
				icon={<IoIosFlash />}
				title='Flash Deals'
				key={"Flash Deals"}
				queryUrl='flash deals'
			/>

			<SectionDeals
				icon={<SiFireship />}
				title='Trending'
				key={"Trending"}
				queryUrl='trending'
			/>

			<CategoriesSection />

			<ServicesSection />
		</div>
	);
};

export default Home;
