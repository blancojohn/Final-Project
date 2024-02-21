import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Context } from '../store/appContext';  
import "../../styles/navbar.css";

export const ChewyNavbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
//ESTE CODIGO ES PARA EL LOGOUT, VUELVE A LA PANTALLA PRINCIPAL Y REMUEVE EL TOKEN DE ACCESO
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken"); 
    actions.logout(); // Actualiza el estado de login utilizando la acción logout
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="me-2 custom-brand">
          Mascotienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/Perros" className="nav-link custom-link" activeClassName="active">
              Perros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Gatos" className="nav-link custom-link" activeClassName="active">
              Gatos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Ofertas" className="nav-link custom-link" activeClassName="active">
              Ofertas
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart" className="nav-link custom-link">
              <i className="fa fa-shopping-cart custom-icon" aria-hidden="true"></i>
              <span className="cart-count">0</span>
            </Nav.Link>
            {
              store.isLoggedIn ? (
                <>
                  <Nav.Link as={NavLink} to="/account" className="nav-link custom-link">
                    <i className="fa fa-user custom-icon" aria-hidden="true"></i>
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-link custom-link" activeClassName="active">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" className="nav-link custom-link" activeClassName="active">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register" className="nav-link custom-link" activeClassName="active">
                    Regístrate
                  </Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
