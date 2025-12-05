import React from 'react';
import { Carousel as BootstrapCarousel, Container } from 'react-bootstrap';
import "../../styles/MyCarousel.css";
// Este componente es el carrusel con las imagenes stock
export const MyCarousel = () => {
  return (
    <Container className='mt-3'>
      <BootstrapCarousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="http://localhost:3001/carrusel1.svg"
            alt="First slide"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="http://localhost:3001/carrusel2.svg"
            alt="Second slide"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="http://localhost:3001/carrusel3.svg"
            alt="Third slide"
          />
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </Container>
  );
};
