import { Context } from '../store/appContext';
import React, { useContext, useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import axios from 'axios';


const Product = () => {

    const { actions } = useContext(Context);
    const [products, setProducts] = useState([]);

    const backendUrl = process.env.BACKEND_URL
    // Utilizamos useEffect para cargar los productos 
    useEffect(() => {

        console.log(backendUrl)
        axios.get(`${backendUrl}/api/products`)
            .then((response) => {

                // Actualizamos el usestate con los productos recibidos
                setProducts(response.data);
            })
            .catch((error) => {
                // En caso de error, lo imprimimos en la consola para no buscar como locos que paso
                console.error('Hubo un error al buscar los productos', error);
            });
    }, []);


    return (
        <div className="container mt-4">
            <div className="mb-4">
                <hr />
                <h2 className='h3'>
                    Nuestros productos:
                </h2>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
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
    )
};

export default Product;