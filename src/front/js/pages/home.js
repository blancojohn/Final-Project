import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { MyCarousel } from '../component/Carousel';
import { ProductCards } from "../component/ProductCards.jsx";
import Barrainfo from "../component/BarraInfo.jsx";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<> <MyCarousel />
			<Barrainfo />
			<ProductCards />
		</>
	)

};
