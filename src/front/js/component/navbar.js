import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../../styles/navbar.css";

export const ChewyNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="border-bottom">
      <Container>
        <Navbar.Brand href="/" className="me-2">
          Mascotienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/Perros" className="nav-link" activeClassName="active">
              Perros
            </NavLink>
            <NavLink to="/Gatos" className="nav-link" activeClassName="active">
              Gatos
            </NavLink>
            <NavLink to="/Ofertas" className="nav-link" activeClassName="active">
              Ofertas
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/search" className="nav-link">
              <i className="fa fa-search" aria-hidden="true"></i>
            </NavLink>
            <NavLink to="/cart" className="nav-link">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="cart-count">0</span>
            </NavLink>
            <NavLink to="/account" className="nav-link">
              <i className="fa fa-user" aria-hidden="true"></i>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
