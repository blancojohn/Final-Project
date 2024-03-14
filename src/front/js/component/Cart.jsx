import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('TEST-54f75dac-aebb-4c0e-9d74-72414a1da510'); // inicializamos el api de mercadopago con nuestra PUBLIC KEY

const Cart = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null); // en este state guardamos el preferenceid MUY IMPORTANTE!!

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      store.cartItems.forEach(item => {
        const discountedPrice = item.product.price * (1 - (item.product.discount || 0));
        total += item.quantity * discountedPrice;
      });
      setTotalAmount(total);
    };
    handlePayment(); // LLAMAMOS LA FUNCION DE HANDLEPAYMENT AL MOMENTO DE CARGAR NUESTRO CARRITO
    calculateTotalAmount(); 
  }, [store.cartItems]);

  const handlePayment = async () => {
    const token = sessionStorage.getItem('access_token');  // aqui obtenemos nuestro token de autenticacion atraves de nuestra sessionstorage

    if (!token) {
      console.error('No se encuentra el token de acceso.'); // si no se encuentra el token tiramos error
      return; 
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mercadopago/createpayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ cartItems: store.cartItems })
      });  // hacemos un fetch a nuestro endpoint en el backend y le pasamos todo lo necesario (items del carrito y nuestro token de autorizacion)

      const data = await response.json();

      if (!response.ok) throw new Error('Error al crear la preferencia de pago'); // esto es por si hay una respuesta de error con nuestro fetch

      setPreferenceId(data.preference_id); // aqui actualizo el state que cree que guarda el preferenceid que vendria siendo la respuesta del api de mercadopago
    } catch (error) {
      console.error('Error en el proceso de pago:', error); // en caso de error tiramos este error
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
        <Wallet
          initialization={{
            preferenceId: preferenceId, // aqui le paso el preferenceid a la wallet para poder crear el boton
          }}
          customization={{
            texts: {
              valueProp: 'Paga de forma segura y rápida con MercadoPago' //esto es solo el texto que trae por defecto se puede cambiar 
            }
          }}
        />
      </div>
    </Container>
  );
};

export default Cart;
