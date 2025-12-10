import React, { useState, useEffect, useContext } from 'react';
import "../../styles/productcards.css";
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, image_url, price, discount, category, actions }) => {

  /* const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false); */

  // Calculamos el precio original y con descuento aquí
  // Aca se usa .toLocaleString() para formatear el precio segun la moneda Chilena
  const originalPrice = price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  const factorDescuento = discount || 0; // puse 0 por si el descuento es nulo o indefinido
  const precioConDescuento = (price - price * factorDescuento).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  // el descuento se obtiene multiplicando el precio original (product.price) por el descuento (factorDescuento).
  // por ejemplo, si el factorDescuento es 0.2 , y el precio original es 100, el valor del descuento sería 20%.
  // entonces, el precio con descuento sería 100 - 20 = 80.

  return (
    <div className="col mb-4">

      <div
        className="card shadow h-100">
        <Link
          to={`/product/${id}`}
          className="btn btn-primary btn-small">
          Mas Detalles
        </Link>
        <img
          src={image_url}
          className="card-img-top img-fluid"
          alt={name} />

        <div
          className="card-body">
          <h5
            className="card-title text-danger">
            {name}
          </h5>
          {/* <p className="card-text">{product.description}</p> */}
        </div>

        <div
          className="card-footer">
          <div
            className="d-flex justify-content-between align-items-center">
            <div>
              {
                factorDescuento > 0 ? (
                  <>
                    <h3
                      className="original-price">
                      {originalPrice}
                    </h3>
                    <h3
                      className="discounted-price">
                      {precioConDescuento}
                    </h3>
                  </>

                ) : (

                  <h3
                    className="current-price">
                    {originalPrice}
                  </h3>
                )
              }

              <p
                className="card-text">
                <small
                  className="text-muted">
                  Categoría: {category}
                </small></p>
            </div>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => actions.addToCart({ id, name, image_url, price, discount, category })}>
              Agregar Al Carro
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
