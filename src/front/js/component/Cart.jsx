import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { initMercadoPago } from '@mercadopago/sdk-react';

// calve publica de mercadopago
initMercadoPago('TEST-54f75dac-aebb-4c0e-9d74-72414a1da510');

const Cart = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    // Calcular el monto total cuando cambian los elementos del carrito
    const calculateTotalAmount = () => {
      let total = 0;
      store.cartItems.forEach(item => {
        const discountedPrice = item.product.price * (1 - (item.product.discount || 0));
        total += item.quantity * discountedPrice;
      });
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [store.cartItems]);

  // funcion q maneja el poroceso de pago
  const handlePayment = async () => {
    try {
      // llamamos al endpoint
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mercadopago/createpayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${store.token}` // ESTE TOKEN DA NULL Y UNDEFINED NOSE COMO  ARREGLARLO!!
        },
        body: JSON.stringify({ cartItems: store.cartItems })
      });
      const data = await response.json();
      console.log(store.token) // ESTE CONSOLE LOG DA UNDEFINED, JOHN TIENE QUE SALIR EL TOKEN GUARDADO EN LOCALSTORAGE !!
      if (!response.ok) throw new Error('Error al crear la preferencia de pago');

      // iniciamos el checkout
      const mp = new window.MercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);
      mp.checkout({
        preference: {
          id: data.preference_id
        },
        autoOpen: true // abre el formulario de pago
      });

    } catch (error) {
      console.error('Error en el proceso de pago:', error);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Tu Carrito</h1>
      {store.cartItems.length > 0 ? (
        <Table responsive="md" striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product.name}</td>
                <td>
                  {item.product.discount > 0 && (
                    <>
                      <del>{item.product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</del>
                      <br />
                    </>
                  )}
                  {(item.product.price * (1 - (item.product.discount || 0))).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </td>
                <td>
                  <Badge bg="secondary" pill>
                    {item.quantity}
                  </Badge>
                </td>
                <td>
                  <Button variant="outline-danger" onClick={() => actions.removeFromCart(item.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center">
          <h4>Tu carrito está vacío</h4>
        </div>
      )}
       <div className="text-end">
        <h5>Total a Pagar: {totalAmount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h5>
        <Button variant="primary" onClick={handlePayment}>Pagar</Button>
      </div>
    </Container>
  );
};

export default Cart;
