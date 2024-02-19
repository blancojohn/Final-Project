import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ProductCards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://urban-space-doodle-wrr9g5wj496r2gp77-3001.app.github.dev/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the products', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((product) => (
          <div className="col mb-4" key={product.id}>
            <div className="card h-100 shadow">
              <img src={product.image_url} className="card-img-top" alt={product.name} style={{ objectFit: 'cover', height: '50%' }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="text-muted">{product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h3>
                    <p className="card-text">Category: {product.category}</p>
                  </div>
                  <button className="btn btn-primary">Comprar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
