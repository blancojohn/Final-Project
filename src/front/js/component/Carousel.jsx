import React from 'react';
import { Carousel as BootstrapCarousel, Container } from 'react-bootstrap';
import "../../styles/MyCarousel.css";

import img1 from "../../../../public/carrusel1.svg";
import img2 from "../../../../public/carrusel2.svg";
import img3 from "../../../../public/carrusel3.svg";


const Carousel = () => {
  return (
    <Container className='mt-3'>
      <BootstrapCarousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={img1}
            alt="First slide"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={img2}
            alt="Second slide"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={img3}
            alt="Third slide"
          />
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </Container>
  );
};

export default Carousel;
