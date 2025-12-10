import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../component/ReviewForm.jsx";
import { Context } from '../store/appContext';

const ProductDetail = () => {
  const { actions } = useContext(Context);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const backendUrl = process.env.BACKEND_URL

  useEffect(() => {
    // Fetch product details
    axios
      .get(
        `${backendUrl}/api/products/${id}`
      )
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al buscar los productos", error);
      });

    // Fetch reviews for the product
    axios
      .get(
        `${backendUrl}/api/reviews/${id}`
      )
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al buscar las reseñas", error);
      });
  }, [id]);

  const handleReviewSubmission = (review) => {
    axios
      .post(
        `${backendUrl}/api/reviews/${id}`,
        review
      )
      .then((response) => {
        setReviews((prevReviews) => [...prevReviews, response.data]);
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la reseña", error);
      });
  };

  if (!product) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        Loading...
      </div>
    );
  }

  const originalPrice = product.price;
  const factorDescuento = product.discount || 0;
  const precioConDescuento = product.price - product.price * factorDescuento;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="row no-gutters">
              <div className="col-md-6">
                <img
                  src={product.image_url}
                  className="img-fluid rounded-start"
                  alt={product.name}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h1 className="card-title">
                    {product.name}
                  </h1>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    {factorDescuento > 0 ? (
                      <>
                        <span className="text-decoration-line-through">
                          {originalPrice.toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </span>
                        <span className="text-danger">
                          {" "}
                          {precioConDescuento.toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </span>
                      </>
                    ) : (
                      originalPrice.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    )}
                  </p>

                  <button
                    className="btn btn-primary"
                    onClick={() => actions.addToCart(product)}>
                    Agregar Al Carro
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="row justify-content-center mt-4">
        <div className="col-12">
          <ReviewForm productId={id} submitReview={handleReviewSubmission} />
          <div className="mt-3">
            <h2>Reseñas</h2>
            {
              Array.isArray(reviews) && reviews.map((review) => (
                <div key={review.id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      {review.username} ({review.rating} Estrellas)
                    </h5>
                    <p className="card-text">{review.text}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
