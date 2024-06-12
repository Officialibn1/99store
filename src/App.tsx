import "./App.css";
import "./components/utility-styles/container.scss";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import About from "./pages/about/About";
import Categories from "./pages/categories/Categories";
import Category from "./pages/category/Category";
import Cart from "./pages/cart/Cart";

const Layout = () => {
	return (
		<>
			<Navbar />
			<div className='layout'>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/products",
				element: <Products />,
			},
			{
				path: "/products/:id",
				element: <Product />,
			},
			{
				path: "/categories",
				element: <Categories />,
			},
			{
				path: "/categories/:id",
				element: <Category />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
