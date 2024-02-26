import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../../styles/productcards.css"; 
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const ProductCards = () => {

  const [showModal, setShowModal] = useState(false);
  const { actions } = useContext(Context);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [products, setProducts] = useState([]);

  // Utilizamos useEffect para cargar los productos 
  useEffect(() => {
    
    // RECORDAR ACTUALIZAR ESTE AXIOS.GET CON TU BASE DE DATOS !!!
    // RECORDAR ACTUALIZAR ESTE AXIOS.GET CON TU BASE DE DATOS !!!
    // RECORDAR ACTUALIZAR ESTE AXIOS.GET CON TU BASE DE DATOS !!!
    axios.get('https://urban-space-doodle-wrr9g5wj496r2gp77-3001.app.github.dev/api/products')  
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
        <h2 className='h3'>Nuestros productos:</h2>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => {
          // Calculamos el precio original y con descuento aquí
           // Aca se usa .toLocaleString() para formatear el precio segun la moneda Chilena
          const originalPrice = product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });  
          const factorDescuento = product.discount || 0; // puse 0 por si el descuento es nulo o indefinido
          const precioConDescuento = (product.price - product.price * factorDescuento).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
          // el descuento se obtiene multiplicando el precio original (product.price) por el descuento (factorDescuento).
          // por ejemplo, si el factorDescuento es 0.2 , y el precio original es 100, el valor del descuento sería 20%.
          // entonces, el precio con descuento sería 100 - 20 = 80.

          return (
            <div className="col" key={product.id}>
              <div className="card shadow h-100">
              <Link to={`/product/${product.id}`} className="btn btn-primary btn-small">Mas Detalles</Link>
                <img src={product.image_url} className="card-img-top img-fluid" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title text-danger">{product.name}</h5>
                  {/* <p className="card-text">{product.description}</p> */}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {factorDescuento > 0 ? (
                        <>
                          <h3 className="original-price">{originalPrice}</h3>
                          <h3 className="discounted-price">{precioConDescuento}</h3>
                        </>
                      ) : (
                        <h3 className="current-price">{originalPrice}</h3>
                      )}
                      <p className="card-text"><small className="text-muted">Categoría: {product.category}</small></p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => actions.addToCart(product)}>Agregar Al Carro</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
