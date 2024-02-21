import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../../styles/navbar.css";

export const ChewyNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="me-2 custom-brand">
          Mascotienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Perros" className="nav-link custom-link" activeclassname="active">
              Perros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Gatos" className="nav-link custom-link" activeclassname="active">
              Gatos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Ofertas" className="nav-link custom-link" activeclassname="active">
              Ofertas
            </Nav.Link>
          </Nav>
          <Nav>
            {/* <NavLink to="/search" className="nav-link custom-link">
              <i className="fa fa-search custom-icon" aria-hidden="true"></i>
            </NavLink> */}
            <Nav.Link as={NavLink} to="/cart" className="nav-link custom-link">
              <i className="fa fa-shopping-cart custom-icon" aria-hidden="true"></i>
              <span className="cart-count">0</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/account" className="nav-link custom-link">
              <i className="fa fa-user custom-icon" aria-hidden="true"></i>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className="nav-link custom-link" activeclassname="active">
              Registrate
            </Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
