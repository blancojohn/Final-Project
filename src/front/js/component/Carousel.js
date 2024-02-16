import React from 'react';
import { Carousel as BootstrapCarousel, Container } from 'react-bootstrap';
import "../../styles/MyCarousel.css";

export const MyCarousel = () => {
  return (
    <Container className='mt-3'>
      <BootstrapCarousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://laikamascotas.cl/cdn-cgi/image/format=auto,quality=80,sharpen=1/https://laikapp.s3.amazonaws.com/dev_images_banners/3021936fb1eff3058307220d3ac0e7dc_1706891133.jpg"
            alt="First slide"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://cms-www.chewy.com/contentAsset/image/483eb5ae-55ff-48f0-a71d-d14377b89997/fileAsset/byInode/1/filter/Resize,Jpeg/jpeg_q/100/resize_w/1440/resize_h/296/2024-02-HC-DentalHealthMonth-Multi-HP-Hero-LG.jpg"
            alt="Second slide"
          />
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://cms-www.chewy.com/contentAsset/image/5b50706d-554f-4274-82b1-f685dfaba81d/fileAsset/byInode/1/filter/Resize,Jpeg/jpeg_q/100/resize_w/1440/resize_h/296/2023-12-AJ-HHCB-Multi-LG.jpg"
            alt="Third slide"
          />
        </BootstrapCarousel.Item>
      </BootstrapCarousel>
    </Container>
  );
};
