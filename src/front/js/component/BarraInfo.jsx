import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faStore, faHeadset } from '@fortawesome/free-solid-svg-icons';
import "../../styles/BarraInfo.css";
const BarraInfo = () => {



  // ESTE COMPONENTE ES SIMPLEMENTE UNA BARRA CON INFORMACION PARA DECORAR LA PAGINA, NO TIENE NINGUNA FUNCIONALIDAD MAS QUE ESTETICA
  return (
    <div className="container my-4">
      <div className="row text-center d-flex justify-content-around">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faTruck} size="lg" className="text-danger me-2" />
          <div>
            <h6 className="barrainfo-heading">Delivery Express</h6>
            <p className="barrainfo-text">Tu pedido en menos de 3 horas</p>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faStore} size="lg" className="text-danger me-2" />
          <div>
            <h6 className="barrainfo-heading">Retiro en tienda</h6>
            <p className="barrainfo-text">¡Gratis!</p>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faHeadset} size="lg" className="text-danger me-2" />
          <div>
            <h6 className="barrainfo-heading">Asesoria</h6>
            <p className="barrainfo-text">Especializada</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraInfo;
