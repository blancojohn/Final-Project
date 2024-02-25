import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { store, actions } = useContext(Context);

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
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.product.name}</td>
                <td>${item.product.price.toFixed(2)}</td>
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
    </Container>
  );
};

export default Cart;
