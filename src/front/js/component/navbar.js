import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Context } from '../store/appContext';
import "../../styles/navbar.css";

export const ChewyNavbar = () => {
  const { store, actions } = useContext(Context);

  const cartItemCount = store.cartItems?.length || 0; // cuántos items hay en el carrito

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          Mascotienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Perros" className={getNavLinkClass}>Perros</Nav.Link>
            <Nav.Link as={NavLink} to="/Gatos" className={getNavLinkClass}>Gatos</Nav.Link>
            <Nav.Link as={NavLink} to="/Ofertas" className={getNavLinkClass}>Ofertas</Nav.Link>
          </Nav>
          <Nav>
            {store.user ? (
              <>
                <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center">
                  <i className="fa fa-shopping-cart me-2"></i>
                  {cartItemCount > 0 && <Badge bg="light" text="dark" className="cart-count">{cartItemCount}</Badge>}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/me" className={getNavLinkClass}>Mi Cuenta</Nav.Link>

                <Navbar.Text className="ms-3">
                  Bienvenido <span className="fw-bold text-light">{store?.user?.name || ''}!</span>
                </Navbar.Text>
                <Button className='ms-5' variant="outline-light" onClick={actions.logOut}>Cerrar Sesión</Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/register" className={getNavLinkClass}>Regístrate / Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
