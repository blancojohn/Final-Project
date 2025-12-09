import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCard.jsx";

const Offer = () => {
    const [products, setProducts] = useState([]);

    const backendUrl = process.env.BACKEND_URL;

    /* useEffect(() => {
        axios.get(`${backendUrl}/api/products`)
            .then((response) => {
                const productsOffers = response.data.filter((data) => data.discount !== 0.0)
                setProducts(productsOffers);
            })

            .catch((error) => {
                console.error('Hubo un error al buscar los productos', error);
            });
    }, []); */


    return (
        <div className="container d-flex justify-content-center mt-5">
            <h1>🎉 ¡Ofertas Especiales! 🎉</h1>
        </div>
    );
};

export default Offer;

