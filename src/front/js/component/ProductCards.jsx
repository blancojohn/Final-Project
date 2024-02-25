import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/productcards.css";

export const ProductCards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://sturdy-space-memory-v66qjgp7xrrq26gwp-3001.app.github.dev/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the products', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card shadow h-100">
              <img src={product.image_url} className="card-img-top img-fluid" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="text-muted">{product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h3>
                    <p className="card-text"><small className="text-muted">Category: {product.category}</small></p>
                  </div>
                  <button className="btn btn-primary">Agregar Al Carro</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
