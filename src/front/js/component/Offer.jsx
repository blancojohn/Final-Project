import React, { useEffect, useState, useContext } from "react";
import { Context } from '../store/appContext';
import axios from 'axios';
import ProductCard from "./ProductCard.jsx";

const Offer = () => {
    const { actions } = useContext(Context);
    const [products, setProducts] = useState([]);

    const backendUrl = process.env.BACKEND_URL;

    useEffect(() => {
        axios.get(`${backendUrl}/api/products`)
            .then((response) => {
                const productsOffers = response.data.filter((data) => data.discount !== 0.0)
                setProducts(productsOffers);
            })

            .catch((error) => {
                console.error('Hubo un error al buscar los productos', error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <hr /><h1>🎉 ¡Ofertas Especiales! 🎉</h1>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-start">
                {
                    products.map(({ id, name, image_url, price, discount, category },
                        key) => (
                        <ProductCard
                            key={key}
                            id={id}
                            name={name}
                            image_url={image_url}
                            price={price}
                            discount={discount}
                            category={category}
                            actions={actions}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Offer;

