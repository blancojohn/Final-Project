import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  // RECORDAR CAMBIAR EL URL DEL AXIOS A TU DATABASE
  useEffect(() => {
    axios.get(`https://urban-space-doodle-wrr9g5wj496r2gp77-3001.app.github.dev/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al buscar los productos', error);
      });
  }, [id]); 

  if (!product) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  //CALCULO DE PRECIO IGUAL QUE EN PRODUCTCARDS
  const originalPrice = product.price;
  const factorDescuento = product.discount || 0;
  const precioConDescuento = product.price - (product.price * factorDescuento);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={product.image_url} className="img-fluid rounded" alt={product.name} style={{ maxHeight: '550px' }} />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="product-name" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 'bold' }}>{product.name}</h1>
          <p className="product-description" style={{ fontFamily: 'Open Sans, sans-serif' }}>{product.description}</p>
          <div className="product-pricing">
            {factorDescuento > 0 && (
              <>
                <h3 className="text-decoration-line-through">
                  {originalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </h3>
                <h3 className="text-danger">
                  {precioConDescuento.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </h3>
              </>
            )}
            {factorDescuento === 0 && (
              <h3>{originalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h3>
            )}
          </div>
          <div className="mt-3">
            <button className="btn btn-primary">Agregar al Carro</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
