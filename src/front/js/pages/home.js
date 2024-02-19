import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { MyCarousel } from '../component/Carousel';
import { CategoryCards } from "../component/CategoryCards.jsx";
import { ProductCards } from "../component/ProductCards.jsx";




export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<><MyCarousel />
		{/* <CategoryCards /> */}
		<ProductCards />
		</>
	)

	};
