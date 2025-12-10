import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Carousel from '../component/Carousel.jsx';
import Barrainfo from "../component/BarraInfo.jsx";
import Product from "../component/Product.jsx";



const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>

			<Carousel />
			<Barrainfo />
			<Product />

		</>
	)

};

export default Home;
