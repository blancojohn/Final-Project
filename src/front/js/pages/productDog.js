import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../../styles/productcards.css";
import { Context } from '../store/appContext';
import ProductCard from '../component/ProductCard.jsx';

const CategoryDog = () => {

    const [showModal, setShowModal] = useState(false);
    const { actions } = useContext(Context);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [products, setProducts] = useState([]);

    const backendUrl = process.env.BACKEND_URL

    // Utilizamos useEffect para cargar los productos 
    useEffect(() => {
        axios.get(`${backendUrl}/api/products`)
            .then((response) => {

                //Filtramos las categoria de perros
                const Perros = response.data.filter((data) => data.category === "Perros")

                // Actualizamos el usestate con los productos recibidos
                setProducts(Perros);

            })
            .catch((error) => {
                // En caso de error, lo imprimimos en la consola para no buscar como locos que paso
                console.error('Hubo un error al buscar los productos', error);
            });
    }, []);

    return (
        <div
            className="container mt-4">
            <div
                className="mb-4">
                <hr />
                <h2
                    className='h3'>
                    Nuestros productos:
                </h2>
            </div>

            <div
                className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
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

export default CategoryDog;
