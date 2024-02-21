import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Register from "../component/Register.jsx";



export const RegisterLogin = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
            <Register />
		</>
	)

	};
