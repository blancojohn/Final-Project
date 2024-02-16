import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const ChewyNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#0066CC' }} variant="dark" className="border-bottom">
      <Container>
        <Navbar.Brand href="/" className="me-2" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700', fontSize: '24px', color: 'white' }}>
          Mascotienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
              Perros
            </NavLink>
            <NavLink to="/shop" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
              Gatos
            </NavLink>
            <NavLink to="/contact" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
              Ofertas
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/search" className="nav-link" style={{ color: 'white' }}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </NavLink>
            <NavLink to="/cart" className="nav-link" style={{ color: 'white' }}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="cart-count">0</span>
            </NavLink>
            <NavLink to="/account" className="nav-link" style={{ color: 'white' }}>
              <i className="fa fa-user" aria-hidden="true"></i>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
