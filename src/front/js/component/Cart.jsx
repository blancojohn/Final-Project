import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
        <h5>Total Original: {totalAmount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h5>
        <Button variant="primary">Pagar Aquí</Button>
      </div>
    </Container>
  );
};

export default Cart;
