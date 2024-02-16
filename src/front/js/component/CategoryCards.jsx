import React from "react";
import { Link } from "react-router-dom";
import "../../styles/CategoryCards.css";


export const CategoryCards = () => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4 p-4 my-2">
        {/* PERRO Category */}
        <div className="col">
          <div className="card bg-dark text-white">
            <Link className="text-decoration-none mb-2" to="/Perros">
              <img
                src="https://i.pinimg.com/564x/9f/4a/e6/9f4ae61abcbfbdd59720d29688b7e962.jpg"
                className="card-img"
                alt="Perro"
              />
              <div className="card-img-overlay d-flex align-items-center justify-content-center">
                <h5 className="fs-1 card-title text-light text-center">PERRO</h5>
              </div>
            </Link>
          </div>
        </div>
        {/* GATO Category */}
        <div className="col">
          <div className="card bg-dark text-white">
            <Link className="text-decoration-none mb-2" to="/Gatos">
              <img
                src="https://i.pinimg.com/564x/b3/6c/3f/b36c3f79e24555793b2a8bcb988aa3a1.jpg"
                className="card-img"
                alt="Gato"
              />
              <div className="card-img-overlay d-flex align-items-center justify-content-center">
                <h5 className="fs-1 card-title text-light text-center">GATO</h5>
              </div>
            </Link>
          </div>
        </div>
        {/* OFERTAS Category */}
        <div className="col">
          <div className="card bg-dark text-white">
            <Link className="text-decoration-none mb-2" to="/Ofertas">
              <img
                src="https://i.pinimg.com/564x/a0/41/81/a04181fc3b9052940f28ec8a3dd20823.jpg"
                className="card-img"
                alt="Ofertas"
              />
              <div className="card-img-overlay d-flex align-items-center justify-content-center">
                <h5 className="fs-1 card-title text-light text-center">OFERTAS</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
